﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using ServiceMap.Models.apiModels;
using ServiceMap.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Net;
using Microsoft.AspNetCore.Identity;
using ServiceMap.Common;

namespace ServiceMap
{
    public class Startup
    {
        IConfiguration Configuration;

        public Startup(IHostingEnvironment env)
        {
            Configuration = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables()
                .Build();
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            // TODO str 214
            services.AddDbContext<AppIdentityDbContext>(options =>
            options.UseSqlServer(Configuration["Data:ConnectionStrings:DbServiceMapIndentity"]));

            services.AddIdentity<AppUser, IdentityRole>(opts =>
            {
                opts.User.RequireUniqueEmail = true;
                //opts.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyz";
                opts.Password.RequiredLength = 8;
                opts.Password.RequireNonAlphanumeric = true;
                opts.Password.RequireLowercase = false;
                opts.Password.RequireUppercase = false;
                opts.Password.RequireDigit = true;
                opts.Lockout.MaxFailedAccessAttempts = 5;
                opts.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromDays(365);

                // Cookie settings
                opts.Cookies.ApplicationCookie.ExpireTimeSpan = TimeSpan.FromDays(1);
                opts.Cookies.ApplicationCookie.CookieName = "MyTntCookie";
                opts.Cookies.ApplicationCookie.CookieHttpOnly = true;
                opts.Cookies.ApplicationCookie.SlidingExpiration = true;

                opts.Cookies.ApplicationCookie.LoginPath = new PathString("/Account/Login");
                opts.Cookies.ApplicationCookie.LogoutPath = new PathString("/Account/Logout");
                opts.Cookies.ApplicationCookie.AccessDeniedPath = new PathString("/Account/AccessDenied");
                opts.Cookies.ApplicationCookie.AutomaticAuthenticate = true;
                opts.Cookies.ApplicationCookie.AutomaticChallenge = true;
                opts.Cookies.ApplicationCookie.AuthenticationScheme = Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme;
                opts.Cookies.ApplicationCookie.ReturnUrlParameter = Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.ReturnUrlParameter;

                opts.Cookies.ApplicationCookie.Events = new CookieAuthenticationEvents
                {
                    OnRedirectToLogin = ctx =>
                    {
                        if (ctx.Request.Path.StartsWithSegments("/api") &&
                            ctx.Response.StatusCode == (int)HttpStatusCode.OK)
                        {
                            ctx.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        }
                        else
                        {
                            ctx.Response.Redirect(ctx.RedirectUri);
                        }
                        return Task.FromResult(0);
                    }
                    // Do zastanowienia nad inną obsługą.
                    //OnRedirectToAccessDenied = ctx =>
                    //{
                    //    if (ctx.Request.Path.StartsWithSegments("/api") &&
                    //        ctx.Response.StatusCode == (int)HttpStatusCode.OK)
                    //    {
                    //        ctx.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                    //    }
                    //    else
                    //    {
                    //        ctx.Response.Redirect(ctx.RedirectUri);
                    //    }
                    //    return Task.FromResult(0);
                    //}
                };

                //opts.Cookies.ApplicationCookie.Events = new CookieAuthenticationEvents
                //{
                //    OnRedirectToLogin = ctx =>
                //    {
                //        ctx.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                //        return Task.FromResult<object>(null);
                //    }
                //};
                //opts.Cookies.ApplicationCookie.AutomaticAuthenticate = true;
                //opts.Cookies.ApplicationCookie.AuthenticationScheme = Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.AuthenticationScheme;
                //opts.Cookies.ApplicationCookie.ReturnUrlParameter = Microsoft.AspNetCore.Authentication.Cookies.CookieAuthenticationDefaults.ReturnUrlParameter;

            })
                // W przypadku innej ścieżki niż domyślna
                //(opt=>opt.Cookies.ApplicationCookie.LoginPath="/")
                .AddEntityFrameworkStores<AppIdentityDbContext>()
                .AddDefaultTokenProviders();
            //services.AddScoped<IAuthorizationService, AuthorizationService>();
            services.AddSingleton(Configuration);
            services.AddScoped<RoleManager<IdentityRole>>();
            services.AddScoped<UserManager<AppUser>>();
            services.AddTransient<IUserService, UserService>();
            services.AddSingleton<IEmailService, EmailService>();



            //   services.AddTransient<IServiceProvider, ServiceCollection>();
            //services.AddTransient<IConfiguration, ConfigureServices>();
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            // Odwłuje się do appsettings.json -> Logging
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseBrowserLink();
            app.UseStatusCodePages();
            app.UseStaticFiles();
            app.UseIdentity();
            AppIdentityDbContext.CreateAdminAccount(app.ApplicationServices, Configuration).Wait();
            //app.UseCookieAuthentication(new CookieAuthenticationOptions()
            //{
            //    AuthenticationScheme = "MyCookieMiddlewareInstance",
            //    LoginPath = new PathString("/Account/Login/"),
            //    AccessDeniedPath = new PathString("/Account/Forbidden/"),
            //    AutomaticAuthenticate = true,
            //    AutomaticChallenge = true
            //});

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                name: "Error",
                template: "Error",
                defaults: new { controller = "Error", action = "Error" });

                routes.MapRoute(
                  name: "infoPanel",
                  template: "{controller=Account}/{action=InfoPanel}/{message}");

                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}");

                //routes.MapRoute(
                // name: "login",
                // template: "{controller=Account}/{action=Login}/{returnUrl}");

                //routes.MapRoute(
                //name: "logout",
                //template: "{controller=Account}/{action=Logout}");


                //routes.MapRoute(
                //name: "forgotPassword",
                //template: "{controller=Account}/{action=ForgotPassword}");

                routes.MapSpaFallbackRoute(
                        name: "spa-fallback",
                        defaults: new { controller = "Home", action = "Index" });

                //routes.MapWebApiRoute("defaultApi",
                //                    "api/{controller}/{id?}");

            });
        }
    }
}

using System;
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
            services.AddIdentity<AppUser, IdentityRole>()
                // W przypadku innej ścieżki niż domyślna
                //(opt=>opt.Cookies.ApplicationCookie.LoginPath="/")
                .AddEntityFrameworkStores<AppIdentityDbContext>();
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
            //app.UseMvcWithDefaultRoute();
            app.UseIdentity();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                name: "Error",
                template: "Error",
                defaults: new { controller = "Error", action = "Error" });

                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");

                routes.MapSpaFallbackRoute(
                    name: "spa-fallback",
                    defaults: new { controller = "Home", action = "Index" });
            });
        }
    }
}

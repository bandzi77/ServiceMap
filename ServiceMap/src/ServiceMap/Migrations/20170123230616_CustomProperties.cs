using ServiceMap.Models.apiModels;
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ServiceMap.Migrations
{
    public partial class CustomProperties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NumberOfRequestsPerMonth",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberOfRequestsPerMonth",
                table: "AspNetUsers");
        }
    }
}

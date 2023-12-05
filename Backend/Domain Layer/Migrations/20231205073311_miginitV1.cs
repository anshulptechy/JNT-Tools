using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Domain_Layer.Migrations
{
    /// <inheritdoc />
    public partial class miginitV1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Managements",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    department = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    firstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    lastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    password = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    tenantName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Managements", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "projectDataTable",
                columns: table => new
                {
                    ProjectId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    projectName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Client = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Budget = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_projectDataTable", x => x.ProjectId);
                });

            migrationBuilder.CreateTable(
                name: "taskTable3",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    taskName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    taskDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    taskStartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    taskEndTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    userName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    tenantName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_taskTable3", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Managements");

            migrationBuilder.DropTable(
                name: "projectDataTable");

            migrationBuilder.DropTable(
                name: "taskTable3");
        }
    }
}

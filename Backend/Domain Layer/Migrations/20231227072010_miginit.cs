using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Domain_Layer.Migrations
{
    /// <inheritdoc />
    public partial class miginit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ApplyLeaves1",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<int>(type: "integer", nullable: false),
                    ManagerName = table.Column<string>(type: "text", nullable: true),
                    EmployeeName = table.Column<string>(type: "text", nullable: true),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    LeaveType = table.Column<string>(type: "text", nullable: true),
                    Reason = table.Column<string>(type: "text", nullable: true),
                    status = table.Column<string>(type: "text", nullable: true),
                    managercomment = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplyLeaves1", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Attendence1",
                columns: table => new
                {
                    AttendenceId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id = table.Column<int>(type: "integer", nullable: false),
                    LoginTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    LogoutTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Hours = table.Column<TimeSpan>(type: "interval", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Attendence1", x => x.AttendenceId);
                });

            migrationBuilder.CreateTable(
                name: "Coupons1",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CouponCode = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    CouponName = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Discount = table.Column<decimal>(type: "numeric(10,4)", nullable: false),
                    Quantity = table.Column<long>(type: "bigint", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    DiscountType = table.Column<string>(type: "text", nullable: false),
                    SupabaseUserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Coupons1", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Events1",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    tenantName = table.Column<string>(type: "text", nullable: false),
                    GoogleCalendarEventId = table.Column<string>(type: "text", nullable: false),
                    title = table.Column<string>(type: "text", nullable: false),
                    start = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    end = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events1", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Managements1",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    email = table.Column<string>(type: "text", nullable: false),
                    department = table.Column<string>(type: "text", nullable: false),
                    firstName = table.Column<string>(type: "text", nullable: false),
                    lastName = table.Column<string>(type: "text", nullable: false),
                    password = table.Column<string>(type: "text", nullable: false),
                    tenantName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Managements1", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "projectDataTable1",
                columns: table => new
                {
                    ProjectId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    projectName = table.Column<string>(type: "text", nullable: false),
                    Client = table.Column<string>(type: "text", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Country = table.Column<string>(type: "text", nullable: false),
                    Budget = table.Column<double>(type: "double precision", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: false),
                    tenantName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_projectDataTable1", x => x.ProjectId);
                });

            migrationBuilder.CreateTable(
                name: "Screenshot1",
                columns: table => new
                {
                    ScreenshotId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id = table.Column<int>(type: "integer", nullable: false),
                    ImageData = table.Column<byte[]>(type: "bytea", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Screenshot1", x => x.ScreenshotId);
                });

            migrationBuilder.CreateTable(
                name: "taskTable1",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    taskName = table.Column<string>(type: "text", nullable: false),
                    taskDescription = table.Column<string>(type: "text", nullable: false),
                    taskStartTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    taskEndTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    userName = table.Column<string>(type: "text", nullable: false),
                    tenantName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_taskTable1", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Login1",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false),
                    email = table.Column<string>(type: "text", nullable: true),
                    password = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.ForeignKey(
                        name: "FK_Login1_Managements1_id",
                        column: x => x.id,
                        principalTable: "Managements1",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SalaryRecords1",
                columns: table => new
                {
                    SalaryId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    EmployeeId = table.Column<int>(type: "integer", nullable: false),
                    SalaryMonth = table.Column<string>(type: "text", nullable: false),
                    Salary = table.Column<int>(type: "integer", nullable: false),
                    Leaves = table.Column<int>(type: "integer", nullable: false),
                    Deductions = table.Column<int>(type: "integer", nullable: false),
                    NetPay = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalaryRecords1", x => x.SalaryId);
                    table.ForeignKey(
                        name: "FK_SalaryRecords1_Managements1_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Managements1",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Coupons1_CouponCode",
                table: "Coupons1",
                column: "CouponCode",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Login1_id",
                table: "Login1",
                column: "id");

            migrationBuilder.CreateIndex(
                name: "IX_SalaryRecords1_EmployeeId",
                table: "SalaryRecords1",
                column: "EmployeeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ApplyLeaves1");

            migrationBuilder.DropTable(
                name: "Attendence1");

            migrationBuilder.DropTable(
                name: "Coupons1");

            migrationBuilder.DropTable(
                name: "Events1");

            migrationBuilder.DropTable(
                name: "Login1");

            migrationBuilder.DropTable(
                name: "projectDataTable1");

            migrationBuilder.DropTable(
                name: "SalaryRecords1");

            migrationBuilder.DropTable(
                name: "Screenshot1");

            migrationBuilder.DropTable(
                name: "taskTable1");

            migrationBuilder.DropTable(
                name: "Managements1");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    public partial class salary : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SalaryHeads",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyId = table.Column<int>(type: "int", nullable: false),
                    Month = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Year = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalaryHeads", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SalaryHeads_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SalaryLines",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SalaryHeadId = table.Column<int>(type: "int", nullable: false),
                    EmployeeId = table.Column<int>(type: "int", nullable: false),
                    NetSalary = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    GrossSalary = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    EmployeeContribute = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    EmployerContribute = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TaxSalary = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    IsPrimary = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SalaryLines", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SalaryLines_SalaryHeads_SalaryHeadId",
                        column: x => x.SalaryHeadId,
                        principalTable: "SalaryHeads",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SalaryHeads_CompanyId",
                table: "SalaryHeads",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_SalaryLines_SalaryHeadId",
                table: "SalaryLines",
                column: "SalaryHeadId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SalaryLines");

            migrationBuilder.DropTable(
                name: "SalaryHeads");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace WebStore.Context.Migrations
{
    public partial class removesoldpricetoproductsoldtable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SoldPrice",
                table: "ProductSold");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "SoldPrice",
                table: "ProductSold",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace WebStore.Context.Migrations
{
    public partial class addsoldpricetoproductsoldtable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "SoldPrice",
                table: "ProductSold",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SoldPrice",
                table: "ProductSold");
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebStore.Context.Migrations
{
    public partial class addingproductdiscounttable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProductDiscount",
                columns: table => new
                {
                    ProductDiscountId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(nullable: false),
                    Price = table.Column<decimal>(nullable: false),
                    DiscountedPrice = table.Column<decimal>(nullable: false),
                    DiscountPercentage = table.Column<int>(nullable: false),
                    DiscountQty = table.Column<int>(nullable: false),
                    FirstDateForDiscountedPrice = table.Column<DateTime>(nullable: false),
                    LastDateForDiscountedPrice = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductDiscount", x => x.ProductDiscountId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductDiscount");
        }
    }
}

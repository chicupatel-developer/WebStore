using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Text.Json.Serialization;


namespace WebStore.Context.Models
{
    public class ProductSold
    {
        [Key]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProductSoldId { get; set; }
        [Required(ErrorMessage = "Product Id is Required!")]
        public int ProductId { get; set; }
        [Required(ErrorMessage = "Product Price is Required!")]
        public decimal Price { get; set; }    
        [Required(ErrorMessage = "Product Qty is Required!")]
        public int Qty { get; set; }
        public DateTime SoldDate { get; set; }
        [Required(ErrorMessage = "User Name is Required!")]
        public string UserName { get; set; }
    }
}
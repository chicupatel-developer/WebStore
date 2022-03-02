export function getProvinces(countryCode) {
  if (countryCode === "US") {
    return [
      {
        name: "Alabama",
      },

      {
        name: "Alaska",
      },

      {
        name: "Arizona",
      },

      {
        name: "California",
      },

      {
        name: "Florida",
      },
      {
        name: "Georgia",
      },

      {
        name: "Illinois",
      },

      {
        name: "Mississippi",
      },
      {
        name: "New Jersey",
      },

      {
        name: "Pennsylvania",
      },

      {
        name: "Washington",
      },

      {
        name: "Texas",
      },

      {
        name: "Nevada",
      },
      {
        name: "Montana",
      },

      {
        name: "New York",
      },
    ];
  } else if (countryCode === "CA") {
    return [
      {
        name: "Manitoba",
      },
      {
        name: "Ontario",
      },

      {
        name: "Alberta",
      },
      {
        name: "British Columbia",
      },
      {
        name: "New Brunswick",
      },
      {
        name: "Newfoundland",
      },
      {
        name: "Nova Scotia",
      },
      {
        name: "Quebec",
      },
      {
        name: "Saskatchewan",
      },
    ];
  } else {
       return [
         {
           name: "Gujarat",
         },
         {
           name: "Punjab",
         },
         {
           name: "Utterpradesh",
         },
         {
           name: "Hariana",
         },
         {
           name: "Kashmir",
         },
         {
           name: "Karnataka",
         },
         {
           name: "Kerala",
         },
         {
           name: "Madhyapradesh",
         },
         {
           name: "Maharastra",
         },
       ];
  }
}
export function getCountry() {
  return [
    { name: "USA", code: "US" },
    { name: "Afghanistan", code: "AF" },
    { name: "Åland Islands", code: "AX" },
    { name: "Albania", code: "AL" },
    { name: "Algeria", code: "DZ" },
    { name: "American Samoa", code: "AS" },
    { name: "AndorrA", code: "AD" },
    { name: "Angola", code: "AO" },
    { name: "Anguilla", code: "AI" },
    { name: "Antarctica", code: "AQ" },
    { name: "Antigua and Barbuda", code: "AG" },
    { name: "Argentina", code: "AR" },
    { name: "Armenia", code: "AM" },
    { name: "Aruba", code: "AW" },
    { name: "Australia", code: "AU" },
    { name: "Austria", code: "AT" },
    { name: "Azerbaijan", code: "AZ" },
    { name: "Bahamas", code: "BS" },
    { name: "Bahrain", code: "BH" },
    { name: "Bangladesh", code: "BD" },
    { name: "Barbados", code: "BB" },
    { name: "Belarus", code: "BY" },
    { name: "Belgium", code: "BE" },
    { name: "Belize", code: "BZ" },
    { name: "Benin", code: "BJ" },
    { name: "Bermuda", code: "BM" },
    { name: "Bhutan", code: "BT" },
    { name: "Bolivia", code: "BO" },
    { name: "Bosnia and Herzegovina", code: "BA" },
    { name: "Botswana", code: "BW" },
    { name: "Bouvet Island", code: "BV" },
    { name: "Brazil", code: "BR" },
    { name: "British Indian Ocean Territory", code: "IO" },
    { name: "Brunei Darussalam", code: "BN" },
    { name: "Bulgaria", code: "BG" },
    { name: "Burkina Faso", code: "BF" },
    { name: "Burundi", code: "BI" },
    { name: "Cambodia", code: "KH" },
    { name: "Cameroon", code: "CM" },
    { name: "Canada", code: "CA" },
    { name: "Cape Verde", code: "CV" },
    { name: "Cayman Islands", code: "KY" },
    { name: "Central African Republic", code: "CF" },
    { name: "Chad", code: "TD" },
  ];
}
export function getRoles() {
  return [
    { name: "Admin"},
    { name: "Shopper" }
  ];
}
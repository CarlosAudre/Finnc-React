 export const FormatDateToString = (date) => {
    const parsedDate = new Date(date);
    
    const formatted = parsedDate.toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    });

    const [month, , year] = formatted.split(" ");

    return month.charAt(0).toUpperCase() + month.slice(1) + " de " + year;
  };
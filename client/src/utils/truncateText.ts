
export const truncateText = (text:string, maxLength:number) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    
    const words = text.split(" ");
    let truncated = "";
  
    for (let word of words) {
      if ((truncated + word).length > maxLength) break;
      truncated += word + " ";
    }
  
    return truncated.trim() + "...";
  };
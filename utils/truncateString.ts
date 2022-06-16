const truncateString = (text: string, maxCharLimit: number) => text.length < maxCharLimit ? text : `${text.slice(0, maxCharLimit)  }...`;
export default truncateString;

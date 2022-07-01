const getBugPriorityColor = (priority: string) => {
  switch (priority) {
    case 'medium':
      return 'warning';
    case 'high':
      return 'error';
    default:
      return 'success';
  }
};
export default getBugPriorityColor;

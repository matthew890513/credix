import { MenuItem } from './menuitem.model';

export function filterMenuByPermissions(items: MenuItem[], permissions: string[]): MenuItem[] {
  return items
    .filter(item =>
      !item.permission || item.permission === 'HOME' || permissions.includes(item.permission)
    )
    .map(item => {
      if (item.children) {
        const filteredChildren = filterMenuByPermissions(item.children, permissions);
        return filteredChildren.length > 0 ? { ...item, children: filteredChildren } : null;
      }
      return item;
    })
    .filter((item): item is MenuItem => item !== null);
}

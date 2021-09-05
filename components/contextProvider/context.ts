const prefix = 'lep';

type ContextType = {
  getGlobalCls: (cls: string) => string;
};

export const context: ContextType = {
  getGlobalCls(cls: string): string {
    return `${prefix}-${cls}`;
  }
};

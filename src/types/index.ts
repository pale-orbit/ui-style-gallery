export type Category = 
  | 'flat-minimal'
  | 'skeuomorphic'
  | 'glass-material'
  | 'hand-drawn'
  | 'pixel-retro'
  | 'other';

export interface StyleParams {
  borderRadius: string;
  shadow: string;
  blur: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  borderWidth: string;
  borderColor: string;
  gradient?: string;
  opacity?: number;
  backdropFilter?: string;
  fontFamily?: string;
  innerShadow?: string;
  textShadow?: string;
  hoverShadow?: string;
}

export interface UIStyle {
  id: string;
  name: string;
  nameEn: string;
  category: Category;
  categoryName: string;
  description: string;
  features: string[];
  params: StyleParams;
}

export type ComponentGroup = 'basic' | 'form' | 'data';

export const categoryNames: Record<Category, string> = {
  'flat-minimal': '扁平与极简',
  'skeuomorphic': '拟物类',
  'glass-material': '玻璃与材质',
  'hand-drawn': '手绘与插画',
  'pixel-retro': '像素与复古',
  'other': '其他',
};

export const componentGroupNames: Record<ComponentGroup, string> = {
  basic: '基础控件组',
  form: '表单组',
  data: '数据展示组',
};

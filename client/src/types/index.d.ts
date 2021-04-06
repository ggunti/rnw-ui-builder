export type StackParamList = {
  login: undefined;
  signup: undefined;
  verifyEmail: undefined;
  projects: undefined;
  projectPreview: { projectId: number };
  pagePreview: { projectId: number; pageId: number };
  projectEditor: { projectId: number };
  pageEditor: { projectId: number; pageId: number };
};

export type TokenType = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export type UserType = {
  id: number;
  email: string;
  isVerified: boolean;
};

export type ProjectType = {
  id: number;
  name: string;
};

export type PageType = {
  id: number;
  projectId: number;
  name: string;
  compressedState?: string;
};

export type Node = {
  type: { resolvedName: string };
  props: Record<string, Prop>;
  nodes: string[];
};

// IMPORTANT: do not use 'type' field here, because it makes craftjs to crash (it is used internally)
export type BasicProp = {
  name: string;
  optional: boolean;
  value: string | number | boolean | undefined;
  shownValue: string | number | boolean;
  oldValue: string | number | boolean;
  oldShownValue: string | number | boolean;
  renderType: 'string' | 'number' | 'boolean' | 'variable';
  selectorType: 'slider' | 'input' | 'colorPicker' | 'dropDown' | 'checkBox';
  selectorProps: Record<string, any>;
};

export type NestedProp = {
  name: string;
  isExpanded?: boolean;
  subprops: Record<string, BasicProp | NestedProp>;
};

export type Prop = BasicProp | NestedProp;

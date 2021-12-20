import { Tree } from 'antd';
import { useState } from 'react';

export declare type Key = string | number;
export interface ITree {
  key: Key;
  title?: string;
  children?: ITree[];
}

export interface FormTreeProps {
  disabled?: boolean;
  treeData?: ITree[];
  value?: Key[];
  onChange?: (value: Key[]) => void;
}

const FormTree: React.FC<FormTreeProps> = ({
  disabled = false,
  treeData,
  value = [],
  onChange,
}) => {
  const oncheck = (checkedKeysValue: any) => {
    onChange?.(checkedKeysValue.checked);
  };

  return (
    <Tree
      disabled={disabled}
      checkable
      checkStrictly
      treeData={treeData}
      onCheck={oncheck}
      checkedKeys={value}
    />
  );
};

export default FormTree;

import { Meta, StoryFn } from '@storybook/react'; // StoryFnを使用
import SearchButton, { SearchButtonProps } from './SearchButton'; // SearchButtonProps を正しくインポート

export default {
    title: 'Atoms/SearchButton',
    component: SearchButton,
    argTypes: {
        color: { control: 'color' }, // カラーを変更可能に
        size: { control: 'number' }, // サイズを変更可能に
        shake: { control: 'boolean' }, // シェイクアニメーションのオン/オフ
    },
} as Meta<SearchButtonProps>; // Metaに型を指定

// テンプレート関数
const Template: StoryFn<SearchButtonProps> = (args: SearchButtonProps) => <SearchButton {...args} />;

// デフォルトのストーリー
export const Default = Template.bind({});
Default.args = {
    color: '#000', // 黒
    size: 24, // サイズは24px
    shake: false, // シェイクなし
};

// シェイク付きのストーリー
export const Shaking = Template.bind({});
Shaking.args = {
    color: '#f00', // 赤
    size: 30, // サイズは30px
    shake: true, // シェイクあり
};

// 大きなアイコンのストーリー
export const LargeIcon = Template.bind({});
LargeIcon.args = {
    color: '#00f', // 青
    size: 40, // サイズは40px
    shake: false, // シェイクなし
};

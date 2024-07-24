import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Card from './Card';

export default {
  title: 'Components/Card',
  component: Card,
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: 1,
  name: 'Hat',
  image: 'https://i.ibb.co/NLF31YD/hat.png',
};

export const LongName = Template.bind({});
LongName.args = {
  ...Default.args,
  name: 'This is a card with a very long name to test text wrapping',
};

export const NoImage = Template.bind({});
NoImage.args = {
  ...Default.args,
  image: '',
};
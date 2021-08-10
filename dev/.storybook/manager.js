import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

/**
 * Storybook Interface Theming API
 * https://storybook.js.org/docs/react/configure/theming
 */

const theme = create({
    base: 'light',
    brandTitle: 'Kanban',
});

addons.setConfig({
    theme
});
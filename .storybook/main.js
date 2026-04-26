/**
 * Developed by Anthony Cox in 2025
 */
const config = {
  stories: [
    /* Base component stories */
    '../stories/base/BaseButton.stories.js',
    '../stories/base/BaseFileInput.stories.js',
    '../stories/base/BaseFooter.stories.js',
    '../stories/base/BaseFormInput.stories.js',
    '../stories/base/BaseHeader.stories.js',
    '../stories/base/BaseHeaderBgImage.stories.js',
    '../stories/base/BaseHeaderTall.stories.js',
    '../stories/base/BaseImage.stories.js',
    '../stories/base/BaseMenuBar.stories.js',

    /* Dialog component stories */
    '../stories/dialog/Dialog.stories.js',
    '../stories/dialog/DialogButton.stories.js',
    '../stories/dialog/DialogContent.stories.js',
    '../stories/dialog/DialogTitle.stories.js',

    /* Header component stories */
    '../stories/header/HeaderAll.stories.js',
    '../stories/header/HeaderTallLogo.stories.js',

    /* Menu Bar component stories */
    '../stories/menu-bar/DropdownMenuBarContainer.stories.js',
    '../stories/menu-bar/DropdownMenuBarItem.stories.js',
    '../stories/menu-bar/MenuBar.stories.js',
    '../stories/menu-bar/MenuBarItem.stories.js',
    '../stories/menu-bar/ScrollMenuBarItemsLeft.stories.js',
    '../stories/menu-bar/ScrollMenuBarItemsRight.stories.js',

    /* Main component stories */
    '../stories/main/Main.stories.js',

    /* Footer component stories */
    '../stories/footer/Footer.stories.js',

    /* Button component stories */
    '../stories/buttons/Accordion.stories.js',
    '../stories/buttons/TabsList.stories.js',

    /* Form component stories */
    '../stories/form/Button.stories.js',
    '../stories/form/Checkbox.stories.js',
    '../stories/form/DateInput.stories.js',
    '../stories/form/Dropdown.stories.js',
    '../stories/form/FileUploadImage.stories.js',
    '../stories/form/FileUploadPdf.stories.js',
    '../stories/form/FormComponentsTest.stories.js',
    '../stories/form/FormDataManager.stories.js',
    '../stories/form/FormManager.stories.js',
    '../stories/form/FormSection.stories.js',
    '../stories/form/PasswordInput.stories.js',
    '../stories/form/RadioButtonGroup.stories.js',
    '../stories/form/SubmitButton.stories.js',
    '../stories/form/TextInput.stories.js',

    /* Image component stories */
    '../stories/images/DecorativeImage.stories.js',
    '../stories/images/FunctionalImage.stories.js',
    '../stories/images/ImagePreview.stories.js',
    '../stories/images/InformativeImage.stories.js',
    '../stories/images/ThreePhotoCollage.stories.js',

    /* Text component stories */
    '../stories/text/ApplicationSubtitleText.stories.js',
    '../stories/text/ApplicationTitleText.stories.js',
    '../stories/text/Heading.stories.js',
    '../stories/text/PageTitleText.stories.js',
    '../stories/text/Paragraph.stories.js',

    /* Full Page Mask components */
    '../stories/page-mask/FullPageMask.stories.js',

    /* Loading component stories */
    '../stories/loading/Spinner.stories.js',

    /* Spacing component stories */
    '../stories/spacing/HorizontalRule.stories.js',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-links',
    '@storybook/addon-webpack5-compiler-swc',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
};
export default config;

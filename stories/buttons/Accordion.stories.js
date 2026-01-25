/**
 * Developed by Anthony Cox in 2025
 */
import React from 'react';
import {
  Accordion,
  Heading,
  Paragraph,
} from '../../components';

export default {
  component: Accordion,
  globals: {
    viewport: {
      value: 'desktop',
    },
  },
  title: 'Buttons/Accordion',
};

/**
 * Accordion component template
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_Accordion = args => {
  return <Accordion {...args}>
    <Heading>
      Accordion Content
    </Heading>
    <Paragraph>
      This content is rendered on expanding the accordion component.
    </Paragraph>
  </Accordion>;
}

/**
 * Multiple Accordion components template
 * @param {JSON} args 
 * @returns {React.Component}
 */
const Template_AccordionMultiple = args => {
  return <React.Fragment>
    <Accordion allowMultipleOpenAccordions={args.allowMultipleOpenAccordions} buttonTextContent="Accordion 1" id="accordion-1">
      <Heading>
        Accordion 1
      </Heading>
      <Paragraph>
        This is the content for the Accordion 1 component.
      </Paragraph>
    </Accordion>
    <Accordion allowMultipleOpenAccordions={args.allowMultipleOpenAccordions} buttonTextContent="Accordion 2" id="accordion-2">
      <Heading>
        Accordion 2
      </Heading>
      <Paragraph>
        This is the content for the Accordion 2 component.
      </Paragraph>
    </Accordion>
    <Accordion allowMultipleOpenAccordions={args.allowMultipleOpenAccordions} buttonTextContent="Accordion 3" id="accordion-3">
      <Heading>
        Accordion 3
      </Heading>
      <Paragraph>
        This is the content for the Accordion 3 component.
      </Paragraph>
    </Accordion>
    <Accordion allowMultipleOpenAccordions={args.allowMultipleOpenAccordions} buttonTextContent="Accordion 4" id="accordion-4">
      <Heading>
        Accordion 4
      </Heading>
      <Paragraph>
        This is the content for the Accordion 4 component.
      </Paragraph>
    </Accordion>
    <Accordion allowMultipleOpenAccordions={args.allowMultipleOpenAccordions} buttonTextContent="Accordion 5" id="accordion-5">
      <Heading>
        Accordion 5
      </Heading>
      <Paragraph>
        This is the content for the Accordion 5 component.
      </Paragraph>
    </Accordion>
  </React.Fragment>;
}

export const Default = {
  args: {
    buttonTextContent: 'Default Accordion',
    id: 'default',
  },
  render: Template_Accordion,
};

export const AllAccordionsCanBeExpanded = {
  args: {
    allowAllAccordionsExpanded: true,
    id: 'allow-multiple-expanded',
  },
  render: Template_AccordionMultiple,
};

export const OnlyOneAccordionExpandedAtATime = {
  args: {
    allowMultipleOpenAccordions: false,
    id: 'only-one-expanded-restriction',
  },
  render: Template_AccordionMultiple,
};

export const WithTruncatedTitleText = {
  args: {
    buttonTextContent: 'Accordion Title Text Which Will Be Truncated',
    id: 'with-text-truncation',
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_Accordion,
};

export const MobilePhoneTest = {
  args: {
    buttonTextContent: 'Accordion Mobile Test',
    id: 'mobile-phone-test',
  },
  globals: {
    viewport: {
      isRotated: false,
      value: 'galaxys9',
    },
  },
  render: Template_Accordion,
};

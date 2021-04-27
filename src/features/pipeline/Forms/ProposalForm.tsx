import React, { useState } from 'react';
import {
  Box,
  FormControl,
  Input,
  FormLabel,
  Heading,
  Divider,
  Textarea,
  BoxProps,
} from '@chakra-ui/core';
import { debounce } from 'lodash';
import Select from 'react-select';

import { useUserOptions } from 'hooks/users';
import { PercentSlider } from 'components/Sliders';
import { initialFormState } from '../utils';

interface Props {
  state: typeof initialFormState['proposal'];
  updateForm: (args: { key: keyof typeof initialFormState['proposal']; value: any }) => void;
  boxProps?: BoxProps;
  isEditPage?: boolean;
}

const Form: React.FC<Props> = ({ state, updateForm, boxProps, isEditPage }) => {
  const [percent, setPercent] = useState<number | undefined>(state.success_probability);
  const { isLoading, userOptions } = useUserOptions({ idAsValue: true });

  const updateSlider = debounce((value: number) => {
    updateForm({ key: 'success_probability', value });
  }, 100);

  const handleSliderUpdate = (value: number) => {
    setPercent(value);
    updateSlider(value);
  };

  return (
    <Box
      background="white"
      borderRadius={4}
      border="1px solid #E2E8F0"
      flexGrow={1}
      mb="auto"
      {...boxProps}
    >
      <Heading
        size="md"
        borderBottom="1px solid #E2E8F0"
        p={3}
      >
        The Proposal
      </Heading>
      <Box as="form" p={4}>
        <FormControl pb={1}>
          <FormControl pb={1} isRequired>
            <FormLabel color="gray.500" fontSize="sm">
              Proposal Leads
            </FormLabel>
            <Select
              value={state.proposal_leads}
              onChange={(value: any) => updateForm({ key: 'proposal_leads', value })}
              // @ts-ignore
              options={userOptions}
              isLoading={isLoading}
              isMulti
            />
          </FormControl>
          <Divider />
          <FormLabel color="gray.500" fontSize="sm">
            Contact Email
          </FormLabel>
          <Input
            name="outcome"
            type="email"
            value={state.contact_email || ''}
            onChange={(e: any) => updateForm({ key: 'contact_email', value: e.target.value })}
            isFullWidth
          />
        </FormControl>
        <Divider />
        <FormControl pb={1}>
          <FormLabel color="gray.500" fontSize="sm">
            Details & Progess Update
          </FormLabel>
          <Textarea
            name="details"
            value={state.details || ''}
            isFullWidth
            onChange={(e: any) => updateForm({ key: 'details', value: e.target.value })}
          />
        </FormControl>
        <Divider />
        <FormControl pb={1}>
          <FormLabel color="gray.500" fontSize="sm">
            Chance to Win
          </FormLabel>
          <PercentSlider value={percent} setValue={handleSliderUpdate} />
        </FormControl>
        {isEditPage && (
          <>
            <Divider />
            <FormControl pb={1}>
              <FormLabel color="gray.500" fontSize="sm">
                Reason If Lost
              </FormLabel>
              <Input
                name="loss_reason"
                value={state.loss_reason || ''}
                onChange={(e: any) => updateForm({ key: 'loss_reason', value: e.target.value })}
                isFullWidth
              />
            </FormControl>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Form;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-extra-boolean-cast */
import {
  Box,
  Step,
  StepContent,
  StepIconProps,
  StepLabel,
  Stepper,
  Typography,
  styled,
  Grid,
  Chip,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import React from 'react';
import { dateFormat } from '../../utils/dateFormat';

const QontoStepIconRoot = styled('div')(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  '& .QontoStepIcon-circle': {
    width: 12,
    height: 12,
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
  },
}));

function QontoStepIcon(props: StepIconProps) {
  const { className } = props;

  return (
    <QontoStepIconRoot className={className}>
      <div className="QontoStepIcon-circle" />
    </QontoStepIconRoot>
  );
}

const InfoItem = ({ label, data }: { label: string; data: string }) => {
  return (
    <Grid container flexDirection="column">
      <Typography
        sx={{ color: grey[700], fontWeight: 600 }}
      >{`${label}: `}</Typography>
      <Typography>{data}</Typography>
    </Grid>
  );
};

export const HistoryTimeline = ({ list }: { list: any }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper orientation="vertical">
        {list.map((step: any, index: any) => {
          const labels: { [key: string]: string } = {
            name: 'Nome',
            dateAdministered: 'Data de aplicação vacina',
            notes: 'Notas adicionais',
            controlDate: 'Data de controle parasitário',
            controlType: 'Tipo de medicação',
            consultationDate: 'Data da consulta',
            diagnosis: 'Diagnóstico',
            treatment: 'Tratamento',
            prescription: 'Prescrição',
            serviceDate: 'Data da higiene',
          };

          const title = () => {
            const stepKeys = Object.keys(step).map((key) => key);
            if (stepKeys.includes('dateAdministered'))
              return (
                <Chip
                  label={'Vacina'}
                  variant="outlined"
                  color="primary"
                  sx={{
                    fontSize: '17px',
                  }}
                />
              );
            if (stepKeys.includes('controlDate'))
              return (
                <Chip
                  label={'Controle Parasitário'}
                  variant="outlined"
                  color="success"
                  sx={{
                    fontSize: '17px',
                  }}
                />
              );
            if (stepKeys.includes('consultationDate'))
              return (
                <Chip
                  label={'Consulta'}
                  variant="outlined"
                  color="info"
                  sx={{
                    fontSize: '17px',
                  }}
                />
              );
            if (stepKeys.includes('serviceDate'))
              return (
                <Chip
                  label={'Higiene'}
                  variant="outlined"
                  color="warning"
                  sx={{
                    fontSize: '17px',
                  }}
                />
              );
          };
          return (
            <Step key={index} expanded sx={{ borderLeftColor: '#48b281' }}>
              <StepLabel StepIconComponent={QontoStepIcon}>
                <Grid container flexDirection="row" alignItems="center" gap={2}>
                  {title()}
                </Grid>
              </StepLabel>
              <StepContent sx={{ width: '300px' }}>
                <Grid container flexDirection={'column'} gap={1}>
                  {Object.entries(step).map((entry: any) => {
                    const normalizeData = (data: string) => {
                      if (entry[0].toLocaleLowerCase().includes('date'))
                        return dateFormat(data);
                      else if (entry[0] === 'notes' && !entry[1].length)
                        return '-';
                      else return data;
                    };

                    if (entry[0] === 'displayDate') return;
                    return (
                      <Grid item rowGap={6}>
                        <InfoItem
                          label={labels[entry[0]]}
                          data={normalizeData(entry[1])}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </StepContent>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

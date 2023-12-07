/* eslint-disable no-extra-boolean-cast */
import { Button, Grid, IconButton, Typography } from '@mui/material';
import { usePetCareContext } from '../../context';
import { HistoryTimeline } from './HistoryTimeline';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Pet } from '../../types/pets';
import { cloneElement } from 'react';
import { Close } from '@mui/icons-material';

const Header = ({
  pet,
  downloadPDF,
}: {
  pet: Pet;
  downloadPDF: () => void;
}) => {
  return (
    <Grid container flexDirection="row" alignContent="flex-start">
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        sx={{
          paddingRight: '50px',
          paddingLeft: '50px',
          marginTop: '30px',
          width: '100%',
          height: '100px',
        }}
      >
        <Button variant="outlined" onClick={() => downloadPDF()}>
          Download do Histórico
        </Button>
        {/* <IconButton onClick={() => }>
          <Close />
        </IconButton> */}
      </Grid>
    </Grid>
  );
};

export const HistoryDownload = () => {
  const { historyList } = usePetCareContext();

  const downloadPDF = async () => {
    const input: HTMLElement = document.getElementById(
      'pdf-content',
    ) as HTMLElement;

    // html2canvas(input).then((canvas) => {
    //   const imgData = canvas; //.toDataURL('image/png');
    //   const pdf = new jsPDF('p', 'mm', 'a4');
    //   pdf.addImage(imgData, 'PNG', 0, 0, 250, pdf.internal.pageSize.height);

    //   pdf.save('document.pdf');
    // });

    if (input) {
      const inputHeight = input.offsetHeight;
      console.log('inputHeight', inputHeight);
      const pageHeight = 890; // Altura de cada página
      let position = 0;

      const pdf = new jsPDF('p', 'mm', 'a4');

      while (position < inputHeight) {
        // Captura a parte visível do componente como imagem
        const canvas = await html2canvas(input, {
          windowHeight: pageHeight,
          y: position,
        });

        // Calcula a proporção da imagem original
        const imgData = canvas.toDataURL('image/png');
        const imgProps = pdf.getImageProperties(imgData);

        // Adiciona a imagem ao PDF, mantendo a proporção original
        const pdfWidth = pdf.internal.pageSize.width;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

        // Move para a próxima posição
        position += pdfHeight;

        // Adiciona nova página se houver mais conteúdo
        if (position < inputHeight) {
          pdf.addPage();
        }
      }

      // Salva o PDF
      pdf.save('document.pdf');
    }
  };

  console.log('historyList', historyList);

  return (
    <>
      <Header pet={historyList} downloadPDF={downloadPDF} />
      <Grid
        container
        alignContent="flex-start"
        sx={{ height: '100vh' }}
        id={'pdf-content'}
      >
        <Grid container justifyContent="center">
          <Typography variant="h4">{`Registros de ${historyList.name}`}</Typography>
        </Grid>
        <Grid
          container
          sx={{ width: '100%', paddingLeft: '40px', paddingTop: '80px' }}
          justifyContent="center"
        >
          <HistoryTimeline list={historyList.history} />
        </Grid>
      </Grid>
    </>
  );
};

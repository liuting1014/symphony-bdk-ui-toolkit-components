import * as React from 'react';
import { Button, CropContent } from '../src/components';

const sampleText =
  `Sed ut perspiciatis unde omnis iste natus error sit voluptatem
accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
quae ab illo inventore veritatis et quasi architecto beatae vitae
dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
sed quia non numquam eius modi tempora incidunt ut labore et dolore
magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
aliquid ex ea commodi consequatur? Quis autem vel eum iure
reprehenderit qui in ea voluptate velit esse quam nihil molestiae
consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
pariatur?`

const Template = (args) => {
  return (
    <CropContent {...args}>
      {sampleText}
      <div className="tk-m-2h"  style={{ display: 'flex', justifyContent: 'center' }}>
        <Button >Got it!</Button>
      </div>
    </CropContent>
  )
}
export const Default = Template.bind({});
Default.args = {
  className: 'tk-quote-container',
};

export const CropContentContainer = () => {
  return (
    <div style={{width:'80%'}}>
      <div className="flex-row">
        <div className="flex-col">
          <h2>Without content overflow</h2>
          <p> Note that squeezing the window and shrinking the content until it overflows will make the show more toggle appear: </p>
          <CropContent className="tk-quote-container tk-quote-container--error">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          </CropContent>
        </div>
      </div>
      <div className="flex-row">
        <div className="flex-col">
          <h2>Unstyled</h2>
          <CropContent>
            {sampleText}
          </CropContent>
        </div>
      </div>
    </div>
  );
};

export default {
  title: 'Components/Containers/Crop Content',
  component: CropContent
};

import React, { Component, Fragment } from 'react';
import Consumer from 'fusion:consumer';

import AperturaRecetaComponent from '../../private/LN/nota/apertura/aperturaReceta';

AperturaRecetaComponent.label = 'LN-AperturaReceta';

export default Consumer(AperturaRecetaComponent);

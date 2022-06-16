import { merge } from 'lodash';
import Dialog from './Dialog';
import Table from './Table';
import Chip from './Chip';
import Card from './Card';
import Lists from './Lists';
import Paper from './Paper';
import Input from './Input';
import Button from './Button';
import Tooltip from './Tooltip';
import Backdrop from './Backdrop';
import Typography from './Typography';
import IconButton from './IconButton';
import Autocomplete from './Autocomplete';
import BottomNavigation from './BottomNavigation';
import Slider from './Slider';

export default function ComponentsOverrides(theme) {
  return merge(
    Slider(theme),
    Dialog(theme),
    Table(theme),
    Chip(theme),
    Card(theme),
    Lists(theme),
    Paper(theme),
    Input(theme),
    Button(theme),
    Tooltip(theme),
    Backdrop(theme),
    Typography(theme),
    IconButton(theme),
    Autocomplete(theme),
    BottomNavigation(theme)
  );
}

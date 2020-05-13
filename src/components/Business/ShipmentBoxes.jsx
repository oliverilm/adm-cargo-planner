import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import shipments from "../../Storage";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AddIcon from '@material-ui/icons/Add';
import "../../index.css"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'start',
    alignItems: "start",
    flexDirection: "column",
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
    marginTop: 20,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

/**
 *
 * @param id
 * @returns {*}
 */
const getShipment = (id) => {
  return shipments.getShipments().find(s => s.id === id);
}

/**
 *
 * @returns {Array}
 * @param {String} shipmentId - Provided id for shipment.
 */
const calculateObjects = (shipmentId) => {
  // TODO: handle null values.
  const boxes = getShipment(shipmentId).boxes
  return boxes !== null ? boxes.trim().split(",").map((unit, i) => {
    return {key: i, label: parseFloat(unit)}
  }) : []
}

export default function ChipsArray(props) {
  const { shipmentId, onShipmentsChange } = props;
  const shipment = getShipment(shipmentId)
  const classes = useStyles();
  const [chipData, setChipData] = useState([]);
  const [number, setNumber] = useState(0)

  useEffect(() => {setChipData(calculateObjects(shipmentId)); getShipment(shipmentId).boxes = shipment.boxes === null ? "" : getShipment(shipmentId).boxes}, [shipment, shipmentId])


  /**
   * Delete an object from chipData array and update shipments in database.
   *
   * @param {Object} chipToDelete - chip object to delete
   * @returns {function(...[*]=)}
   */
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    getShipment(shipmentId).boxes = chipData.map(r => {
      return r.label
    }).join()
    onShipmentsChange()
  };

  /**
   * Add a number to the shipment string.
   */
  const handleNumberAdd = (e) => {
    e.preventDefault()
    let boxesString = chipData.length > 0 ? chipData.map(r => {
      return r.label
    }) : null

    getShipment(shipmentId).boxes = boxesString !== null ? [boxesString, number].join() : [number].join()
    setChipData(calculateObjects(shipmentId))
    setNumber(0)
    onShipmentsChange()

  }

  /**
   * Update state when input field value changes.
   *
   * @param e
   */
  const handleNumberInputChange = (e) => {
    setNumber(e.target.value);
  }

  return (
    <form onSubmit={handleNumberAdd}>
    <div className={classes.root}>
      <div className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item>
            <TextField id="input-with-icon-grid" label="With a grid" onChange={handleNumberInputChange} value={number} type={"number"}/>
          </Grid>
          <Grid item>
            <AddIcon className={"add-button"} onClick={handleNumberAdd} />
          </Grid>
        </Grid>
      </div>
    <div style={{display: "flex", flexWrap: "wrap", marginTop: 10}}>
      {chipData.map((data, i) => {
        return (
          <div key={i}>
            <Chip
              label={data.label}
              onDelete={handleDelete(data)}
              className={classes.chip}
            />
          </div>
        );

      })}</div>

    </div>
    </form>
  );
}

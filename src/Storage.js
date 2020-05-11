class Shipments {

  shipments = []

  /**
   * Store shipments.
   * @param s
   */
  setShipments(s) {
    this.shipments = s;
  }

  /**
   * Return stored shipments.
   *
   * @returns {[]}
   */
  getShipments() {
    return this.shipments
  }
}

const shipments = new Shipments()
export default shipments;
class MaiarConnexionManager {

  constructor(walletConnect, connexionTimeout, heartbeatTimeout, heartbeatEnabled) {
    this._walletConnect = walletConnect;
    this._heartbeatTimeout = heartbeatTimeout;
    this._hearbeatEnabled = heartbeatEnabled ? heartbeatEnabled : false ;
    this._connexionTimeout = connexionTimeout;

    this._heartbeatDisconnectInterval = null;
    this._heartbeatInterval = null;
  }

  startConnexionLostDetection() {
    if(!this._hearbeatEnabled) {
      return;
    }
    if (this._walletConnect.walletConnector.peerMeta.description.match(/(iPad|iPhone|iPod)/g)) {
      console.log("heartbeat - iPad/iPhone/iPod : no heartbeat");
      return;
    }
    this.heartbeat();
    this.newConnexionLostInterval();

    this._walletConnect.walletConnector.on("heartbeat", () => {
      console.log("Maiar App heartbeat received!");
      this.newConnexionLostInterval();
    });
  }

  heartbeat() {
    console.log("Heartbeat");
    if(!this.isConnected()) {
      return;
    }
    const that = this;
    if(!this._heartbeatInterval) {
      this._heartbeatInterval = setInterval( () => {that.heartbeat()}, this._heartbeatTimeout);
    }
    this._walletConnect.sendCustomMessage({
      method: "heartbeat",
      params: {},
    })
      .then(() => {
        console.log("Maiar App heartbeat sent");
      })
      .catch((err) => {
        console.log("Maiar App heartbeat error", err);
        that._walletConnect.logout();
        setTimeout(() => {that.heartbeat()}, that._heartbeatInterval);
      });
  }

  newConnexionLostInterval() {
    if(this._heartbeatDisconnectInterval) {
      clearInterval(this._heartbeatDisconnectInterval);
    }

    const that = this;
    this._heartbeatDisconnectInterval = setInterval(() => {
      console.log("Maiar App Connection Lost");
      clearInterval(that._heartbeatDisconnectInterval);
      clearInterval(that._heartbeatInterval)
      that._walletConnect.logout();
    }, this._connexionTimeout);
  }

  isConnected() {
    return this._walletConnect &&
      "walletConnector" in this._walletConnect &&
      this._walletConnect.walletConnector.connected
  }
}

export default MaiarConnexionManager;

var os = require("os");

module.exports = {
  getPlatform: function(){
    return os.platform();
  },

  getHostname: function(){
    return os.hostname();
  },

  getType: function(){
    return os.type();
  },

  getArch: function(){
    return os.arch();
  },

  getRelease: function(){
    return os.release();
  },

  getCpus: function(){
    var cpus = os.cpus();
    return { count: cpus.length, model: cpus[0].model };
  }
};

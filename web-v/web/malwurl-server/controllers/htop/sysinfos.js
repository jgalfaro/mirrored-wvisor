var sysinfos = require("../../lib/htop/sysinfo");

module.exports = function(app){
  app.get("/sysinfos", function(req, res){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json({
      "platform": sysinfos.getPlatform(),
      "hostname": sysinfos.getHostname(),
      "type": sysinfos.getType(),
      "arch": sysinfos.getArch(),
      "release": sysinfos.getRelease(),
      "cpus": sysinfos.getCpus()
    });
  });
};

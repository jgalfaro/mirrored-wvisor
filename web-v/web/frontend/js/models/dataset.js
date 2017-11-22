App.Dataset = DS.Model.extend({
  name: DS.attr("string"),
  countURLs: DS.attr("number"),
  uploadDate: DS.attr("string"),
  description: DS.attr("string"),
  downloadPath: DS.attr("string")
});

App.Dataset.FIXTURES = [
  {
    id: 1,
    name: "100k-1",
    countURLs: 100000,
    uploadDate: "20/12/2013",
    description: "100k-1 description",
    downloadPath: "/toto"
  },
  {
    id: 2,
    name: "100k-2",
    countURLs: 100000,
    uploadDate: "21/12/2013",
    description: "100k-2 description",
    downloadPath: "/tata"
  },
  {
    id: 3,
    name: "100k-3",
    countURLs: 100000,
    uploadDate: "19/12/2013",
    description: "100k-3 description",
    downloadPath: "/plop"
  }
];

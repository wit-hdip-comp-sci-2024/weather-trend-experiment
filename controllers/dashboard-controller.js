import axios from "axios";

const apiKey = "YOUR API KEY HERE";
const weatherRequestUrl = `https://api.openweathermap.org/data/2.5/weather?q=Tramore,Ireland&units=metric&appid=${apiKey}`;

export const dashboardController = {
  async index(request, response) {
    const viewData = {
      title: "Template Application",
    };
    console.log("dashboard rendering");
    response.render("dashboard-view", viewData);
  },
  async addreport(request, response) {
    console.log("rendering new report");
    let report = {};
    const lat = request.body.lat || "52.2502793";
    const lng = request.body.lng || "-7.1177689";
    const latLongRequestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`;
    const result = await axios.get(latLongRequestUrl);
    if (result.status == 200) {
      report.tempTrend = [];
      report.trendLabels = [];
      const trends = result.data.list;
      for (let i=0; i<10; i++) {
        report.tempTrend.push(trends[i].main.temp);
        report.trendLabels.push(trends[i].dt_txt);
      }
    }
    console.log(report);
    const viewData = {
      title: "Weather Report",
      reading: report,
    };
    response.render("dashboard-view", viewData);
  },
};

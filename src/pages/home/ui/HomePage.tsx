import { useUser } from "@/app/providers";
import { API_URL } from "@/shared/env";
import { BarChart } from "@/shared/ui/chart";
import { FC, useEffect, useState } from "react";

interface Data {
  total_summary: {
    total_requests: number;
    total_categories: number;
  };
  monthly_requests: {
    month: string;
    count: number;
  }[];
  category_statistics: {
    [key: string]: {
      [key: string]: number;
    };
  };
  priority_statistics: {
    low: {
      [key: string]: number;
    };
    mid: {
      [key: string]: number;
    };
    high: {
      [key: string]: number;
    };
    critical: {
      [key: string]: number;
    };
  };
  current_statistics: {
    total_defects: number;
    by_category: {
      [key: string]: number;
    };
    by_priority: {
      [key: string]: number;
    };
  };
}
function formatDate(dateString: string) {
  const date = new Date(dateString);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = monthNames[date.getMonth()]; // getMonth() returns 0-11

  return `${month}`;
}

function getLabel(priority: string): string {
  switch (priority) {
    case "critical":
      return "Критическая";
    case "high":
      return "Высокая";
    case "mid":
      return "Средняя";
    case "low":
      return "Низкая";
    default:
      return "Добро пожаловать в Нейро Портал!";
  }
}

export const HomePage: FC = () => {
  const { token } = useUser();
  const [data, setData] = useState<Data>();

  const getStatistics = async () => {
    const res = await fetch(API_URL + "/v1/user/statistics", {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const json = await res.json();

    json["monthly_requests"].push({
      month: "2024-10-01 00:00:00",
      count: 15,
    });

    json["monthly_requests"].push({
      month: "2024-09-01 00:00:00",
      count: 21,
    });
    json["monthly_requests"].push({
      month: "2024-08-01 00:00:00",
      count: 7,
    });
    json["monthly_requests"].push({
      month: "2024-07-01 00:00:00",
      count: 12,
    });
    json["monthly_requests"].push({
      month: "2024-06-01 00:00:00",
      count: 6,
    });
    json["monthly_requests"].push({
      month: "2024-05-01 00:00:00",
      count: 25,
    });

    json["priority_statistics"]["low"] = {
      "2024-11": json["priority_statistics"]["low"]["2024-11"],
      "2024-10": 4,
      "2024-09": 8,
      "2024-08": 3,
      "2024-07": 7,
      "2024-06": 6,
      "2024-05": 5,
    };

    json["priority_statistics"]["mid"] = {
      "2024-11": 3,
      "2024-10": 2,
      "2024-09": 1,
      "2024-08": 4,
      "2024-07": 3,
      "2024-06": 8,
      "2024-05": 2,
    };
    json["priority_statistics"]["high"] = {
      "2024-11": json["priority_statistics"]["high"]["2024-11"],
      "2024-10": 1,
      "2024-09": 1,
      "2024-08": 5,
      "2024-07": 7,
      "2024-06": 10,
      "2024-05": 3,
    };
    json["priority_statistics"]["critical"] = {
      "2024-11": json["priority_statistics"]["critical"]["2024-11"],
      "2024-10": 4,
      "2024-09": 4,
      "2024-08": 2,
      "2024-07": 1,
      "2024-06": 2,
      "2024-05": 1,
    };

    json["category_statistics"]["выбоина"] = {
      "2024-11": json["category_statistics"]["выбоина"]["2024-11"],
      "2024-10": 4,
      "2024-09": 4,
      "2024-08": 2,
      "2024-07": 1,
      "2024-06": 2,
      "2024-05": 1,
    };

    json["category_statistics"]["лужа"] = {
      "2024-11": json["category_statistics"]["лужа"]["2024-11"],
      "2024-10": 2,
      "2024-09": 1,
      "2024-08": 4,
      "2024-07": 3,
      "2024-06": 8,
      "2024-05": 2,
    };

    setData(json);
  };

  useEffect(() => { }, [data]);

  useEffect(() => {
    if (token) getStatistics();
  }, [token]);

  function getColor(category: string): string {
    if (category == "выбоина") return "#7A7F89";
    else return "#F29100";
  }

  return (
    <section className="w-full h-full">
      <div className="flex gap-2 h-full items-start">
        <div className="h-full gap-5 w-full bg-bg-surface1 rounded-l flex flex-col p-5">
          <div className="flex-1 w-full bg-bg-surface2 p-8 rounded-l">
            <h1 className="heading-2 uppercase mb-11">общая сводка</h1>
            <div className="h-[320px] w-full">
              {data && data.monthly_requests && (
                <BarChart
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                  data={{
                    labels: data.monthly_requests
                      .slice(0)
                      .reverse()
                      .map((i) => formatDate(i.month)),
                    datasets: [
                      {
                        label: "Заявки",
                        data: data.monthly_requests
                          .slice(0)
                          .reverse()
                          .map((i) => i.count),
                      },
                    ],
                  }}
                />
              )}
            </div>
          </div>
          <div className="flex gap-5 justify-between flex-1">
            <div className="flex-1 bg-bg-surface2 flex justify-between flex-col rounded-l p-8">
              <div>
                <h2 className="heading-2 uppercase mb-3">По категориям</h2>
                <div className="flex flex-wrap gap-3">
                  <div className="flex gap-1 items-center">
                    <div className="rounded-full h-2 w-2 bg-fg-soft" />
                    <span>Выбоина</span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <div className="rounded-full h-2 w-2 bg-warning" />
                    <span>Лужа</span>
                  </div>
                </div>
              </div>
              <div>
                {data && data.monthly_requests && (
                  <BarChart
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          grid: {
                            display: true,
                          },
                          stacked: true,
                        },
                        x: {
                          grid: {
                            display: true,
                          },
                          stacked: true,
                        },
                      },
                    }}
                    data={{
                      labels: Array.from(
                        new Set(
                          Object.keys(data.category_statistics).flatMap(
                            (category) =>
                              Object.keys(
                                data.category_statistics[category],
                              ).map((date) => formatDate(date)),
                          ),
                        ),
                      )
                        .slice(0)
                        .reverse(),
                      datasets: Object.keys(data.category_statistics).map(
                        (category) => ({
                          label: category,
                          backgroundColor: getColor(category),

                          data: Object.keys(
                            data.category_statistics[category],
                          ).map(
                            (date) => data.category_statistics[category][date],
                          ),
                        }),
                      ),
                      //datasets: [
                      //  {
                      //    label: "Заявки",
                      //    data: Object.keys(data.category_statistics).map(
                      //      (category) =>
                      //        Object.keys(
                      //          data.category_statistics[category],
                      //        ).map(
                      //          (date) =>
                      //            data.category_statistics[category][date],
                      //        ),
                      //    )[0],
                      //  },
                      //],
                    }}
                  />
                )}
              </div>
            </div>
            <div className="flex-1 flex justify-between flex-col h-full bg-bg-surface2 rounded-l p-8">
              <div>
                <h2 className="heading-2 uppercase mb-3">По статусам</h2>
                <div className="flex flex-wrap gap-3">
                  <div className="flex gap-1 items-center">
                    <div className="rounded-full h-2 w-2 bg-fg-soft" />
                    <span>Низкая</span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <div className="rounded-full h-2 w-2 bg-warning" />
                    <span>Средняя</span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <div className="rounded-full h-2 w-2 bg-status-06" />
                    <span>Высокая</span>
                  </div>
                  <div className="flex gap-1 items-center">
                    <div className="rounded-full h-2 w-2 bg-error" />
                    <span>Критическая</span>
                  </div>
                </div>
              </div>
              <div>
                {data && data.monthly_requests && (
                  <BarChart
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          grid: {
                            display: true,
                          },
                          stacked: true,
                        },
                        x: {
                          grid: {
                            display: true,
                          },
                          stacked: true,
                        },
                      },
                    }}
                    data={{
                      labels: Object.keys(data.priority_statistics.low)
                        .map((priority) => formatDate(priority))
                        .slice(0)
                        .reverse(),
                      datasets: [
                        {
                          label: getLabel("low"),
                          backgroundColor: "#7A7F89",
                          data: [
                            ...Object.keys(data.priority_statistics.low).map(
                              (priority) =>
                                data.priority_statistics.low[priority],
                            ),
                          ],
                        },
                        {
                          label: getLabel("mid"),
                          backgroundColor: "#F29100",
                          data: [
                            ...Object.keys(data.priority_statistics.mid).map(
                              (priority) =>
                                data.priority_statistics.mid[priority],
                            ),
                          ],
                        },
                        {
                          label: getLabel("high"),
                          backgroundColor: "#FA5300",
                          data: [
                            ...Object.keys(data.priority_statistics.high).map(
                              (priority) =>
                                data.priority_statistics.high[priority],
                            ),
                          ],
                        },
                        {
                          label: getLabel("critical"),
                          backgroundColor: "#D91528",
                          data: [
                            ...Object.keys(
                              data.priority_statistics.critical,
                            ).map(
                              (priority) =>
                                data.priority_statistics.critical[priority],
                            ),
                          ],
                        },
                      ],
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[500px] flex flex-col gap-6 bg-bg-surface1 p-6 rounded-l flex-shrink-0">
          <div>
            <h2 className="heading-2 uppercase mb-4">Общее кол-во дефектов</h2>
            <span className="display-l">
              {data?.current_statistics.total_defects}
            </span>
          </div>
          <div className="border-[1px] border-border" />
          <div>
            <h2 className="heading-2 uppercase mb-6">по статусам</h2>
            <div className="flex flex-wrap gap-2">
              {data &&
                Object.keys(data.current_statistics.by_priority || {}).map(
                  (priority) => (
                    <div
                      className="flex gap-2.5 p-4 w-[222px] bg-bg-surface3 rounded-m"
                      key={priority}
                    >
                      <div className="p-3 rounded-full bg-bg-surface1">
                        <img src={`/${priority}.svg`} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="body-s-strong text-fg-soft">
                          {getLabel(priority)}
                        </span>
                        <h2 className="heading-2 uppercase">
                          {data.current_statistics.by_priority[priority]}
                        </h2>
                      </div>
                    </div>
                  ),
                )}
            </div>
          </div>
          <div className="border-[1px] border-border" />
          <div>
            <h2 className="heading-2 uppercase mb-6">по категориям </h2>
            <div className="flex gap-2">
              {data &&
                Object.keys(data.current_statistics.by_category || {}).map(
                  (category) => (
                    <div
                      className="rounded-m p-4 bg-bg-surface3 w-[145px] flex flex-col gap-1"
                      key={category}
                    >
                      <span className="body-s-strong text-fg-soft">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </span>
                      <h2 className="heading-2 uppercase">
                        {data.current_statistics.by_category[category]}
                      </h2>
                    </div>
                  ),
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

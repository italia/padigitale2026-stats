interface Stats {
  nb_uniq_visitors: number;
  nb_visits: number;
  nb_users: number;
  nb_actions: number;
  max_actions: number;
  bounce_count: number;
  sum_visit_length: number;
  nb_visits_new: number;
  nb_actions_new: number;
  nb_uniq_visitors_new: number;
  nb_users_new: number;
  max_actions_new: number;
  bounce_rate_new: string;
  nb_actions_per_visit_new: number;
  avg_time_on_site_new: number;
  nb_visits_returning: number;
  nb_actions_returning: number;
  nb_uniq_visitors_returning: number;
  nb_users_returning: number;
  max_actions_returning: number;
  bounce_rate_returning: string;
  nb_actions_per_visit_returning: number;
  avg_time_on_site_returning: number;
  Referrers_visitorsFromSearchEngines: number;
  Referrers_visitorsFromSocialNetworks: number;
  Referrers_visitorsFromDirectEntry: number;
  Referrers_visitorsFromWebsites: number;
  Referrers_visitorsFromCampaigns: number;
  Referrers_distinctSearchEngines: number;
  Referrers_distinctSocialNetworks: number;
  Referrers_distinctKeywords: number;
  Referrers_distinctWebsites: number;
  Referrers_distinctWebsitesUrls: number;
  Referrers_distinctCampaigns: number;
  nb_conversions: number;
  nb_visits_converted: number;
  revenue: number;
  conversion_rate: string;
  nb_conversions_new_visit: number;
  nb_visits_converted_new_visit: number;
  revenue_new_visit: number;
  conversion_rate_new_visit: string;
  nb_conversions_returning_visit: number;
  nb_visits_converted_returning_visit: number;
  revenue_returning_visit: number;
  conversion_rate_returning_visit: string;
  nb_pageviews: number;
  nb_uniq_pageviews: number;
  nb_downloads: number;
  nb_uniq_downloads: number;
  nb_outlinks: number;
  nb_uniq_outlinks: number;
  nb_searches: number;
  nb_keywords: number;
  Referrers_visitorsFromDirectEntry_percent: string;
  Referrers_visitorsFromSearchEngines_percent: string;
  Referrers_visitorsFromCampaigns_percent: string;
  Referrers_visitorsFromSocialNetworks_percent: string;
  Referrers_visitorsFromWebsites_percent: string;
  bounce_rate: string;
  nb_actions_per_visit: number;
  avg_time_on_site: number;
}

try {
  const waiToken = Deno.env.get("WAI_TOKEN");
  const waiSiteId = Deno.env.get("WAI_SITE_ID");

  const params = new URLSearchParams({
    module: "API",
    format: "json",
    idSite: `${waiSiteId}`,
    period: "day",
    date: "previous30",
    method: "API.get",
    token_auth: `${waiToken}`,
  });

  const res = await fetch(
    `https://webanalytics.italia.it/matomo/index.php?${params.toString()}`
  );

  const data: Record<string, Stats> = await res.json();

  await Deno.writeTextFile("data.json", JSON.stringify(data));

  const dates = ["_"];
  const uniqueVisitors: [string | number] = ["Visitatori unici"];

  for (const key in data) {
    dates.push(key);
    uniqueVisitors.push(data[key].nb_uniq_visitors);
  }

  await Deno.writeTextFile(
    "dataviz.json",
    JSON.stringify([dates, uniqueVisitors])
  );
} catch (error) {
  console.error(error);
  Deno.exit(1);
}

import scrapeIt from "scrape-it";
import fs from "fs";

const data = scrapeIt.scrapeHTML(fs.readFileSync("tmp.html", "utf-8"), {
    users: {
        listItem: 'div.member__5d473',
        data: {
            name: {
                selector: 'span.name__703b9',
            },
            iconImageUrl: {
                selector: 'img.avatar__44b0c',
                attr: 'src',
                convert: (src: string) => src.startsWith('/') ? `https://canary.discord.com` + src : src,
            },
            th: {
                convert: () => 70,
            }
        },
    },
});
fs.writeFileSync("discord-users.json", JSON.stringify(data, null, 2), "utf-8");

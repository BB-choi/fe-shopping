import { sliderData } from "../../data/data.js";
import { $ } from "../util/dom.js";

export const options = {
  mainBanner: {
    data: sliderData,
    sec: 1.7,
    slideUlElement: $(".carousel-items"),
    imgAreaElement: $(".carousel-img-area"),
  },
  localStorage: {
    dataSizeLimit: 10,
    options: {
      recentSearchKeyName: "recent-search",
      dataName: "recentSearchWord",
    },
  },
  view: {
    searchFormArea: $(".search-form-area"),
    dataName: "recentSearchWord",
    datasetName: "idx",
    selectedIdxClassName: "focus",
  },
  controller: {
    recentSearchKeyName: "recent-search",
    suggestionUrl: `https://completion.amazon.com/api/2017/suggestions?mid=ATVPDKIKX0DER&alias=aps&prefix=`,
    suggestionDelay: 120,
    message: {
      confirmMsg: `저장된 최근 검색어를 모두 삭제하시겠습니까?`,
      completeMsg: `삭제 되었습니다.`,
      cancelMsg: `취소 되었습니다.`,
    },
  },
};

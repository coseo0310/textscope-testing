<script setup lang="ts">
import { computed } from "vue";
import CheckBox from "@/components/shared/CheckBox.vue";
import DatePicker from "@/components/shared/DatePicker.vue";
import SearchSelector, { Item } from "@/components/shared/SearchSelector.vue";
import { useWorkStore, useCommonStore } from "@/store";
import { storeToRefs } from "pinia";

interface Props {
  closeCallback: Function;
}

const props = defineProps<Props>();

const commonStore = useCommonStore();
const workStore = useWorkStore();
const { filter } = storeToRefs(workStore);

const PREV = JSON.parse(JSON.stringify(filter.value));

const registerColor = computed(() =>
  filter.value.align === "register" ? "#dfe1e6" : "#ffffff"
);
const inspectionColor = computed(() =>
  filter.value.align === "inspector" ? "#dfe1e6" : "#ffffff"
);

const onMark = computed(() => {
  return filter.value.status.length > 0 && filter.value.status.length < 4;
});

const onClose = () => {
  filter.value = PREV;
  props.closeCallback();
};

const onFilter = () => {
  props.closeCallback();
};

const onAlign = (type: "register" | "inspector") => {
  filter.value.align = type;
};

const onDateSelected = (date: string) => {
  const sp = date.split("~");
  filter.value.startDate = sp[0];
  filter.value.endDate = sp[1];
};

const onSelected = (
  type: "all" | "analysis" | "wait" | "progress" | "complete",
  b: boolean
) => {
  switch (type) {
    case "all":
      if (filter.value.status.length === 4) {
        filter.value.status = [];
      } else {
        filter.value.status = ["analysis", "wait", "progress", "complete"];
      }
      break;
    default:
      if (b) {
        filter.value.status = [...filter.value.status, type];
      } else {
        filter.value.status = filter.value.status.filter((f) => f !== type);
      }
      break;
  }
};

const onSelector = (
  type: "documents" | "registers" | "teams",
  items: Item[]
) => {
  switch (type) {
    case "documents":
      filter.value.documents = items;
      break;
    case "teams":
      filter.value.teams = items;
      break;
    case "registers":
      filter.value.register = items;
      break;
    default:
      break;
  }
};
</script>

<template>
  <article :class="modal.layout">
    <section :class="header.layout" aria-label="상단 타이틀 헤더">
      <h1>필터</h1>
      <button type="button">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M14.1111 2.88892C14.4793 2.88892 14.7778 3.18739 14.7778 3.55558V6.88892C14.7778 7.25711 14.4793 7.55558 14.1111 7.55558H10.7778C10.4096 7.55558 10.1111 7.25711 10.1111 6.88892C10.1111 6.52073 10.4096 6.22225 10.7778 6.22225H13.4444V3.55558C13.4444 3.18739 13.7429 2.88892 14.1111 2.88892Z"
            fill="#0052CC"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.6108 3.71051C7.68056 3.57857 6.73264 3.75253 5.90988 4.2062C5.08711 4.65986 4.43409 5.36864 4.0492 6.22574C3.66431 7.08283 3.56841 8.0418 3.77596 8.95814C3.9835 9.87448 4.48325 10.6985 5.19989 11.3061C5.91652 11.9137 6.81123 12.272 7.74917 12.3268C8.68711 12.3817 9.61748 12.1303 10.4001 11.6104C11.1827 11.0905 11.7751 10.3303 12.0881 9.44441C12.2107 9.09725 12.5916 8.91524 12.9387 9.03789C13.2859 9.16054 13.4679 9.5414 13.3453 9.88856C12.936 11.047 12.1613 12.0411 11.1379 12.721C10.1145 13.4008 8.89784 13.7297 7.6713 13.6579C6.44476 13.5861 5.27476 13.1177 4.33762 12.3231C3.40048 11.5286 2.74697 10.451 2.47556 9.25267C2.20416 8.05438 2.32956 6.80035 2.83288 5.67953C3.33619 4.55872 4.19015 3.63185 5.26607 3.0386C6.342 2.44534 7.58159 2.21785 8.79805 2.39039C10.0111 2.56245 11.1356 3.12299 12.0031 3.98786L14.5682 6.40336C14.8362 6.65578 14.8489 7.0777 14.5965 7.34575C14.344 7.6138 13.9221 7.62647 13.6541 7.37405L11.0819 4.95183C11.0769 4.94721 11.0721 4.94251 11.0673 4.93774C10.4032 4.27317 9.54104 3.84246 8.6108 3.71051Z"
            fill="#0052CC"
          />
        </svg>
        전체 설정 초기화
      </button>
    </section>
    <section :class="content.layout" aria-label="필터 내용">
      <div :class="box.layout" aria-label="조회 기간">
        <h1 :class="box.title">조회 기간</h1>
        <div :class="search.box">
          <div :class="search.text">조회 기준</div>
          <div :class="search.standard">
            <p @click="onAlign('register')">등록일 기준</p>
            <p @click="onAlign('inspector')">검수일 기준</p>
          </div>
          <div :class="search.text">기간 선택</div>
          <div :class="search.date">
            <DatePicker
              :range="true"
              :default-start="filter.startDate"
              :default-end="filter.endDate"
              class="filter"
              @selected="onDateSelected"
            />
          </div>
        </div>
      </div>
      <div :class="box.layout" aria-label="검수 상태">
        <h1 :class="box.title">검수 상태</h1>
        <div :class="check.all_check">
          <div :class="check.check">
            <CheckBox
              :default="filter.status.length === 4"
              :middle="onMark"
              @change="
                (b) => {
                  onSelected('all', b);
                }
              "
            />
          </div>
          <p>모든 상태</p>
        </div>
        <div :class="box.divider"></div>
        <div :class="check.group_check">
          <div :class="check.box_check">
            <div :class="check.check">
              <CheckBox
                :default="filter.status.includes('analysis')"
                @change="
                  (b) => {
                    onSelected('analysis', b);
                  }
                "
              />
            </div>
            <p :class="status.analysis">분석대기</p>
          </div>
          <div :class="check.box_check">
            <div :class="check.check">
              <CheckBox
                :default="filter.status.includes('wait')"
                @change="
                  (b) => {
                    onSelected('wait', b);
                  }
                "
              />
            </div>
            <p :class="status.wait">검수대기</p>
          </div>
          <div :class="box.space"></div>
          <div :class="box.space"></div>
          <div :class="check.box_check">
            <div :class="check.check">
              <CheckBox
                :default="filter.status.includes('progress')"
                @change="
                  (b) => {
                    onSelected('progress', b);
                  }
                "
              />
            </div>
            <p :class="status.progress">검수중</p>
          </div>
          <div :class="check.box_check">
            <div :class="check.check">
              <CheckBox
                :default="filter.status.includes('complete')"
                @change="
                  (b) => {
                    onSelected('complete', b);
                  }
                "
              />
            </div>
            <p :class="status.complete">검수완료</p>
          </div>
        </div>
      </div>
      <div :class="box.layout" aria-label="문서 종류">
        <h1 :class="box.title">문서 종류</h1>
        <SearchSelector
          :class="selector.margin"
          uid="documents"
          :items="commonStore.getDocuments"
          :default="filter.documents"
          placeholder="문서명을 검색하거나 목록에서 선택"
          @selected="(items) => onSelector('documents', items)"
        />
      </div>
      <div :class="box.layout" aria-label="부서">
        <h1 :class="box.title">부서</h1>
        <SearchSelector
          :class="selector.margin"
          uid="teams"
          :items="commonStore.getTeams"
          :default="filter.teams"
          placeholder="부서명을 검색하거나 목록에서 선택"
          @selected="(items) => onSelector('teams', items)"
        />
      </div>
      <div :class="box.layout" aria-label="등록 담당자">
        <h1 :class="box.title">등록 담당자</h1>
        <SearchSelector
          :class="selector.margin"
          uid="register"
          :items="commonStore.getRegisters"
          :default="filter.register"
          placeholder="담당자를 검색하거나 목록에서 선택"
          @selected="(items) => onSelector('registers', items)"
        />
      </div>
    </section>
    <section :class="footer.layout" aria-label="버튼">
      <button :class="footer.close" type="button" @click="onClose">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.17499 5.99999L10.7583 2.42499C10.9152 2.26807 11.0034 2.05524 11.0034 1.83333C11.0034 1.61141 10.9152 1.39858 10.7583 1.24166C10.6014 1.08474 10.3886 0.996582 10.1667 0.996582C9.94474 0.996582 9.73191 1.08474 9.57499 1.24166L5.99999 4.82499L2.42499 1.24166C2.26807 1.08474 2.05524 0.996582 1.83333 0.996582C1.61141 0.996582 1.39858 1.08474 1.24166 1.24166C1.08474 1.39858 0.996582 1.61141 0.996582 1.83333C0.996582 2.05524 1.08474 2.26807 1.24166 2.42499L4.82499 5.99999L1.24166 9.57499C1.08474 9.73191 0.996582 9.94474 0.996582 10.1667C0.996582 10.3886 1.08474 10.6014 1.24166 10.7583C1.39858 10.9152 1.61141 11.0034 1.83333 11.0034C2.05524 11.0034 2.26807 10.9152 2.42499 10.7583L5.99999 7.17499L9.57499 10.7583C9.73191 10.9152 9.94474 11.0034 10.1667 11.0034C10.3886 11.0034 10.6014 10.9152 10.7583 10.7583C10.9152 10.6014 11.0034 10.3886 11.0034 10.1667C11.0034 9.94474 10.9152 9.73191 10.7583 9.57499L7.17499 5.99999Z"
            fill="#242424"
          />
        </svg>
        <p>닫기</p>
      </button>
      <button :class="footer.on" type="button" @click="onFilter">
        <svg
          width="14"
          height="10"
          viewBox="0 0 14 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13.1448 0.244078C13.4703 0.569515 13.4703 1.09715 13.1448 1.42259L5.50596 9.06148C5.34968 9.21776 5.13771 9.30556 4.9167 9.30556C4.69569 9.30556 4.48373 9.21776 4.32745 9.06148L0.855223 5.58926C0.529786 5.26382 0.529786 4.73618 0.855223 4.41075C1.18066 4.08531 1.7083 4.08531 2.03373 4.41075L4.9167 7.29371L11.9663 0.244078C12.2918 -0.0813592 12.8194 -0.0813592 13.1448 0.244078Z"
            fill="white"
          />
        </svg>
        <p>필터 적용하기</p>
      </button>
    </section>
  </article>
</template>

<style lang="scss" module="modal">
.layout {
  position: absolute;
  right: 0;
  top: 0;
  width: 480px;
  height: 100vh;
  background-color: $n-0;
  padding-bottom: 116px;
  box-shadow: 0px 10px 18px rgba(9, 30, 66, 0.15),
    0px 0px 1px rgba(9, 30, 66, 0.31);
}
</style>

<style lang="scss" module="box">
.layout {
  width: 100%;
  padding: 32px;
  background-color: $n-10;
  border-radius: 4px;
  border: 1px solid $n-30;
  margin-top: 12px;
}

.title {
  color: $m-900;
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
}

.space {
  padding: 5px;
}

.divider {
  width: 352px;
  height: 1px;
  background-color: $n-30;
  margin: 12px 0;
}
</style>

<style lang="scss" module="check">
.check {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  margin-right: 10px;
}

.all_check {
  display: flex;
  align-items: center;
  margin-top: 20px;

  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    color: $m-700;
  }
}
.group_check {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.box_check {
  display: flex;
  align-items: center;
}
</style>

<style lang="scss" module="search">
.text {
  display: flex;
  align-items: center;
  height: 34px;
  font-weight: 600;
  font-size: 12px;
  color: $n-200;
}

.box {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  margin-top: 20px;
  gap: 7.5px;
}

.standard {
  display: flex;

  p {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 6px 14px;
    color: $m-700;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    cursor: pointer;
  }

  :first-child {
    border-radius: 4px 0 0 4px;
    border-top: 1px solid $n-50;
    border-left: 1px solid $n-50;
    border-bottom: 1px solid $n-50;
    background-color: v-bind(registerColor);
  }
  :last-child {
    border-radius: 0 4px 4px 0;
    border-top: 1px solid $n-50;
    border-left: 1px solid $n-50;
    border-bottom: 1px solid $n-50;
    border-right: 1px solid $n-50;
    background-color: v-bind(inspectionColor);
  }
}
</style>

<style lang="scss" module="header">
.layout {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 17px;
  padding-right: 32px;
  padding-left: 32px;

  h1 {
    color: $m-900;
    font-size: 29px;
    font-weight: 700;
    line-height: 32px;
  }

  button {
    display: flex;
    align-items: center;
    outline: none;
    border: 0px;
    border-bottom: 1px solid $b-400;
    background: transparent;
    font-size: 14px;
    font-weight: 400;
    height: 20px;
    color: $b-400;
    padding: 0 2px;
    cursor: pointer;

    svg {
      margin-right: 5px;
    }
  }
}
</style>

<style lang="scss" module="content">
.layout {
  height: calc(100% - 64px);
  overflow-y: scroll;
  padding: 0 32px;

  &::-webkit-scrollbar {
    width: 0px;
  }
  &::-webkit-scrollbar-thumb {
    background: #5e5e5e;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #1b1b1b;
  }
}
</style>

<style lang="scss" module="footer">
.layout {
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 84px;
  padding: 0 32px;
  background-color: #ffffff;
}

.close {
  display: flex;
  align-items: center;
  outline: none;
  background-color: transparent;
  border: 1px solid $n-50;
  padding: 10px 14px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;

  p {
    padding-left: 5px;
  }
}

.on {
  display: flex;
  align-items: center;
  outline: none;
  background-color: $m-700;
  color: $n-0;
  border: none;
  padding: 10px 14px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;

  p {
    padding-left: 5px;
  }
}
</style>

<style lang="scss" module="status">
.analysis {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  font-weight: 600;
  font-size: 11px;
  line-height: 16px;
  border-radius: 3px;
  color: $m-500;
  background-color: $n-40;
}

.wait {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  font-weight: 600;
  font-size: 11px;
  line-height: 16px;
  border-radius: 3px;
  color: $b-500;
  background-color: $b-50;
}

.progress {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  font-weight: 600;
  font-size: 11px;
  line-height: 16px;
  border-radius: 3px;
  color: $p-500;
  background-color: $p-50;
}

.complete {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  font-weight: 600;
  font-size: 11px;
  line-height: 16px;
  border-radius: 3px;
  color: $g-500;
  background-color: $g-50;
}
</style>

<style lang="scss" module="selector">
.margin {
  margin-top: 20px;
}
</style>

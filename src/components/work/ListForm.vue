<script setup lang="ts">
import { computed } from "vue";
import Grid from "@/components/shared/Grid.vue";
import Pagination from "@/components/shared/Pagination.vue";
import { useWorkStore } from "@/store";
import { storeToRefs } from "pinia";

const workStore = useWorkStore();
const { isFilter, searchTerm, align } = storeToRefs(workStore);

const registerColor = computed(() =>
  align.value === "register" ? "#dfe1e6" : "transparent"
);
const inspectionColor = computed(() =>
  align.value === "inspection" ? "#dfe1e6" : "transparent"
);

const onAlign = (type: "register" | "inspection") => {
  align.value = type;
};

const onKeyup = (e: KeyboardEvent) => {
  if (e.code === "Enter") {
    onEnter();
  }
  const el = e.target as HTMLInputElement;
  searchTerm.value = el.value;
};

const onEnter = () => {
  alert("search");
};

const onFilter = () => {
  isFilter.value = true;
};
</script>

<template>
  <article :class="article.layout">
    <section :class="filter.section" aria-label="검색 필터 영역">
      <div :class="filter.box">
        <p :class="filter.text">정렬방식</p>
        <div :class="filter.align">
          <p @click="onAlign('register')">등록일순</p>
          <p @click="onAlign('inspection')">검색일순</p>
        </div>
      </div>
      <div :class="filter.box">
        <button :class="filter.filter_btn" @click="onFilter">
          <i>
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
                d="M1.8397 2.7194C1.94894 2.48395 2.1849 2.33331 2.44445 2.33331H13.5556C13.8151 2.33331 14.0511 2.48395 14.1603 2.7194C14.2695 2.95484 14.2322 3.23228 14.0646 3.43046L9.77778 8.49963V13C9.77778 13.231 9.65815 13.4456 9.4616 13.5671C9.26506 13.6886 9.01963 13.6996 8.81297 13.5963L6.59075 12.4852C6.36489 12.3722 6.22222 12.1414 6.22222 11.8889V8.49963L1.9354 3.43046C1.7678 3.23228 1.73046 2.95484 1.8397 2.7194ZM3.88132 3.66665L7.39794 7.82505C7.49971 7.9454 7.55556 8.09792 7.55556 8.25554V11.4768L8.44445 11.9213V8.25554C8.44445 8.09792 8.50029 7.9454 8.60207 7.82505L12.1187 3.66665H3.88132Z"
                fill="#242424"
              />
            </svg>
          </i>
          <p>검색필터</p>
        </button>
        <div :class="filter.box">
          <input
            :class="filter.search"
            type="text"
            name="searchTrem"
            placeholder="문서명으로 검색"
            @keyup="onKeyup"
          />
          <i :class="filter.search_icon" @click="onEnter">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M18.57 17.43L16.19 15.06C17.0213 13.9945 17.4719 12.6814 17.47 11.33C17.47 10.1156 17.1099 8.92852 16.4352 7.9188C15.7606 6.90909 14.8016 6.12211 13.6797 5.65738C12.5577 5.19266 11.3232 5.07107 10.1322 5.30798C8.94111 5.5449 7.84706 6.12968 6.98837 6.98837C6.12968 7.84706 5.5449 8.94111 5.30798 10.1322C5.07107 11.3232 5.19266 12.5577 5.65738 13.6797C6.12211 14.8016 6.90909 15.7606 7.9188 16.4352C8.92852 17.1099 10.1156 17.47 11.33 17.47C12.6814 17.4719 13.9945 17.0213 15.06 16.19L17.43 18.57C17.5854 18.6976 17.7828 18.7628 17.9836 18.7529C18.1845 18.743 18.3744 18.6588 18.5166 18.5166C18.6588 18.3744 18.743 18.1845 18.7529 17.9836C18.7628 17.7828 18.6976 17.5854 18.57 17.43ZM6.80001 11.33C6.79663 10.5825 6.97787 9.84578 7.32764 9.18517C7.6774 8.52456 8.18486 7.96054 8.80498 7.54316C9.42509 7.12579 10.1387 6.86799 10.8823 6.79264C11.626 6.7173 12.3768 6.82674 13.068 7.11126C13.7592 7.39577 14.3695 7.84656 14.8447 8.42359C15.3198 9.00062 15.6452 9.68605 15.7918 10.419C15.9384 11.152 15.9018 11.9098 15.6851 12.6252C15.4685 13.3406 15.0786 13.9915 14.55 14.52C13.9182 15.1585 13.1108 15.5948 12.2304 15.7733C11.35 15.9519 10.4364 15.8646 9.60575 15.5227C8.77507 15.1808 8.0648 14.5996 7.56521 13.8531C7.06562 13.1065 6.79927 12.2283 6.80001 11.33Z"
                fill="currentColor"
              />
            </svg>
          </i>
        </div>
      </div>
    </section>
    <section :class="grid.section" aria-label="그리드 영역"></section>
    <section :class="func.section" aria-label="기능 영역">
      <div :class="func.box">
        <button :class="func.btn_on" type="button">
          <i>
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
                d="M1.22223 9.11112C1.22223 8.74293 1.52071 8.44446 1.8889 8.44446H5.22223C5.59042 8.44446 5.8889 8.74293 5.8889 9.11112C5.8889 9.47931 5.59042 9.77779 5.22223 9.77779H2.55556V12.4445C2.55556 12.8126 2.25709 13.1111 1.8889 13.1111C1.52071 13.1111 1.22223 12.8126 1.22223 12.4445V9.11112Z"
                fill="currentColor"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M14.1111 2.88892C14.4793 2.88892 14.7778 3.18739 14.7778 3.55558V6.88892C14.7778 7.25711 14.4793 7.55558 14.1111 7.55558H10.7778C10.4096 7.55558 10.1111 7.25711 10.1111 6.88892C10.1111 6.52073 10.4096 6.22225 10.7778 6.22225H13.4444V3.55558C13.4444 3.18739 13.7429 2.88892 14.1111 2.88892Z"
                fill="currentColor"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.20099 3.83869C8.49781 3.6353 7.75458 3.61335 7.04063 3.77489C6.32667 3.93643 5.66528 4.27619 5.11816 4.76248C4.57103 5.24877 4.15601 5.86573 3.91182 6.5558C3.78899 6.9029 3.40804 7.08471 3.06094 6.96188C2.71385 6.83905 2.53204 6.4581 2.65486 6.111C2.97419 5.20861 3.51691 4.40181 4.23238 3.7659C4.94785 3.12998 5.81275 2.68567 6.74638 2.47443C7.68001 2.26318 8.65193 2.29189 9.57147 2.55786C10.4876 2.82284 11.3219 3.31471 11.9972 3.98784L14.5676 6.40312C14.836 6.65525 14.8491 7.07716 14.597 7.34548C14.3448 7.6138 13.9229 7.62692 13.6546 7.37479L11.0768 4.95257C11.0717 4.9478 11.0667 4.94295 11.0618 4.93802C10.5443 4.42029 9.90416 4.04208 9.20099 3.83869ZM1.40306 8.65466C1.65519 8.38634 2.0771 8.37322 2.34542 8.62534L4.92319 11.0476C4.92827 11.0523 4.93327 11.0572 4.9382 11.0621C5.45567 11.5798 6.09586 11.9581 6.79903 12.1614C7.50221 12.3648 8.24544 12.3868 8.95939 12.2253C9.67335 12.0637 10.3347 11.7239 10.8819 11.2377C11.429 10.7514 11.844 10.1344 12.0882 9.44434C12.211 9.09724 12.592 8.91543 12.9391 9.03826C13.2862 9.16109 13.468 9.54204 13.3452 9.88913C13.0258 10.7915 12.4831 11.5983 11.7676 12.2342C11.0522 12.8702 10.1873 13.3145 9.25364 13.5257C8.32001 13.737 7.34809 13.7083 6.42855 13.4423C5.51247 13.1773 4.67813 12.6854 4.00278 12.0123L1.43238 9.59702C1.16406 9.34489 1.15093 8.92298 1.40306 8.65466Z"
                fill="currentColor"
              />
            </svg>
          </i>
          <p>새로고침</p>
        </button>
        <button
          :class="{
            [func.btn_on]: workStore.isRPA,
            [func.btn_off]: !workStore.isRPA,
          }"
          type="button"
        >
          <i>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_308_1467)">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12.4466 2.88672H3.5533C3.08237 2.88848 2.63133 3.0768 2.29896 3.41042C1.96658 3.74404 1.77996 4.19579 1.77997 4.66672V11.3334C1.77996 11.8043 1.96658 12.2561 2.29896 12.5897C2.63133 12.9233 3.08237 13.1116 3.5533 13.1134H12.4466C12.9176 13.1116 13.3686 12.9233 13.701 12.5897C14.0334 12.2561 14.22 11.8043 14.22 11.3334V4.66672C14.22 4.19579 14.0334 3.74404 13.701 3.41042C13.3686 3.0768 12.9176 2.88848 12.4466 2.88672ZM3.5533 4.22005H12.4466C12.5124 4.22293 12.5768 4.23989 12.6355 4.2698C12.6941 4.2997 12.7457 4.34185 12.7866 4.39339L7.99997 7.74005L3.2133 4.40672C3.25296 4.35272 3.30394 4.30804 3.36267 4.2758C3.42139 4.24355 3.48645 4.22453 3.5533 4.22005ZM12.4466 11.7801H3.5533C3.436 11.7783 3.32409 11.7305 3.24176 11.6469C3.15943 11.5633 3.11329 11.4507 3.1133 11.3334V5.94672L7.61997 9.10005C7.73157 9.17747 7.86415 9.21896 7.99997 9.21896C8.13579 9.21896 8.26837 9.17747 8.37997 9.10005L12.8866 5.94672V11.3334C12.8866 11.4507 12.8405 11.5633 12.7582 11.6469C12.6758 11.7305 12.5639 11.7783 12.4466 11.7801Z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0_308_1467">
                  <rect
                    width="13.3333"
                    height="13.3333"
                    fill="currentColor"
                    transform="translate(1.33331 1.33337)"
                  />
                </clipPath>
              </defs>
            </svg>
          </i>
          <p>RPA 재전송</p>
        </button>
        <button
          :class="{
            [func.btn_on]: workStore.isSelection,
            [func.btn_off]: !workStore.isSelection,
          }"
          type="button"
        >
          <i>
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
                d="M2.33334 4.66672C2.33334 4.29853 2.63182 4.00005 3.00001 4.00005H13C13.3682 4.00005 13.6667 4.29853 13.6667 4.66672C13.6667 5.03491 13.3682 5.33338 13 5.33338H3.00001C2.63182 5.33338 2.33334 5.03491 2.33334 4.66672Z"
                fill="currentColor"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.8889 3.11117C6.77103 3.11117 6.65798 3.15799 6.57463 3.24134C6.49128 3.32469 6.44446 3.43774 6.44446 3.55561V4.00005H9.55557V3.55561C9.55557 3.43774 9.50874 3.32469 9.4254 3.24134C9.34205 3.15799 9.229 3.11117 9.11112 3.11117H6.8889ZM10.8889 4.00005V3.55561C10.8889 3.08411 10.7016 2.63193 10.3682 2.29853C10.0348 1.96513 9.58262 1.77783 9.11112 1.77783H6.8889C6.41741 1.77783 5.96522 1.96513 5.63182 2.29853C5.29843 2.63193 5.11112 3.08411 5.11112 3.55561V4.00005H4.11112C3.74293 4.00005 3.44446 4.29853 3.44446 4.66672V12.4445C3.44446 12.916 3.63176 13.3682 3.96516 13.7016C4.29855 14.035 4.75074 14.2223 5.22224 14.2223H10.7778C11.2493 14.2223 11.7015 14.035 12.0349 13.7016C12.3683 13.3682 12.5556 12.916 12.5556 12.4445V4.66672C12.5556 4.29853 12.2571 4.00005 11.8889 4.00005H10.8889ZM4.77779 5.33339V12.4445C4.77779 12.5624 4.82462 12.6754 4.90797 12.7588C4.99132 12.8421 5.10436 12.8889 5.22224 12.8889H10.7778C10.8957 12.8889 11.0087 12.8421 11.0921 12.7588C11.1754 12.6754 11.2222 12.5624 11.2222 12.4445V5.33339H4.77779Z"
                fill="currentColor"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M9.11112 6.77783C9.47931 6.77783 9.77779 7.07631 9.77779 7.4445V10.7778C9.77779 11.146 9.47931 11.4445 9.11112 11.4445C8.74294 11.4445 8.44446 11.146 8.44446 10.7778V7.4445C8.44446 7.07631 8.74294 6.77783 9.11112 6.77783Z"
                fill="currentColor"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.8889 6.77783C7.25709 6.77783 7.55556 7.07631 7.55556 7.4445V10.7778C7.55556 11.146 7.25709 11.4445 6.8889 11.4445C6.52071 11.4445 6.22223 11.146 6.22223 10.7778V7.4445C6.22223 7.07631 6.52071 6.77783 6.8889 6.77783Z"
                fill="currentColor"
              />
            </svg>
          </i>
          <p>선택항목 삭제</p>
        </button>
      </div>
      <div :class="func.box">
        <button :class="func.btn_on" type="button">
          <i>
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
                d="M2.99998 9.00004C3.36817 9.00004 3.66665 9.29852 3.66665 9.66671V11.8889C3.66665 12.0068 3.71347 12.1198 3.79682 12.2032C3.88017 12.2865 3.99322 12.3334 4.11109 12.3334H11.8889C12.0067 12.3334 12.1198 12.2865 12.2031 12.2032C12.2865 12.1198 12.3333 12.0068 12.3333 11.8889V9.66671C12.3333 9.29852 12.6318 9.00004 13 9.00004C13.3682 9.00004 13.6666 9.29852 13.6666 9.66671V11.8889C13.6666 12.3604 13.4793 12.8126 13.1459 13.146C12.8125 13.4794 12.3604 13.6667 11.8889 13.6667H4.11109C3.63959 13.6667 3.18741 13.4794 2.85401 13.146C2.52061 12.8126 2.33331 12.3604 2.33331 11.8889V9.66671C2.33331 9.29852 2.63179 9.00004 2.99998 9.00004Z"
                fill="currentColor"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.99998 2.33337C8.36817 2.33337 8.66665 2.63185 8.66665 3.00004V9.66671C8.66665 10.0349 8.36817 10.3334 7.99998 10.3334C7.63179 10.3334 7.33331 10.0349 7.33331 9.66671V3.00004C7.33331 2.63185 7.63179 2.33337 7.99998 2.33337Z"
                fill="currentColor"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.75078 6.41753C5.01113 6.15718 5.43324 6.15718 5.69359 6.41753L7.99997 8.72391L10.3063 6.41753C10.5667 6.15718 10.9888 6.15718 11.2491 6.41753C11.5095 6.67788 11.5095 7.09999 11.2491 7.36034L8.47137 10.1381C8.21102 10.3985 7.78891 10.3985 7.52856 10.1381L4.75078 7.36034C4.49043 7.09999 4.49043 6.67788 4.75078 6.41753Z"
                fill="currentColor"
              />
            </svg>
          </i>
          <p>인식결과 내보내기</p>
        </button>
        <button :class="func.btn_on" type="button">
          <i>
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
                d="M2.99998 9.00004C3.36817 9.00004 3.66665 9.29852 3.66665 9.66671V11.8889C3.66665 12.0068 3.71347 12.1198 3.79682 12.2032C3.88017 12.2865 3.99322 12.3334 4.11109 12.3334H11.8889C12.0067 12.3334 12.1198 12.2865 12.2031 12.2032C12.2865 12.1198 12.3333 12.0068 12.3333 11.8889V9.66671C12.3333 9.29852 12.6318 9.00004 13 9.00004C13.3682 9.00004 13.6666 9.29852 13.6666 9.66671V11.8889C13.6666 12.3604 13.4793 12.8126 13.1459 13.146C12.8125 13.4794 12.3604 13.6667 11.8889 13.6667H4.11109C3.63959 13.6667 3.18741 13.4794 2.85401 13.146C2.52061 12.8126 2.33331 12.3604 2.33331 11.8889V9.66671C2.33331 9.29852 2.63179 9.00004 2.99998 9.00004Z"
                fill="currentColor"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.99998 2.33337C8.36817 2.33337 8.66665 2.63185 8.66665 3.00004V9.66671C8.66665 10.0349 8.36817 10.3334 7.99998 10.3334C7.63179 10.3334 7.33331 10.0349 7.33331 9.66671V3.00004C7.33331 2.63185 7.63179 2.33337 7.99998 2.33337Z"
                fill="currentColor"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.75078 6.41753C5.01113 6.15718 5.43324 6.15718 5.69359 6.41753L7.99997 8.72391L10.3063 6.41753C10.5667 6.15718 10.9888 6.15718 11.2491 6.41753C11.5095 6.67788 11.5095 7.09999 11.2491 7.36034L8.47137 10.1381C8.21102 10.3985 7.78891 10.3985 7.52856 10.1381L4.75078 7.36034C4.49043 7.09999 4.49043 6.67788 4.75078 6.41753Z"
                fill="currentColor"
              />
            </svg>
          </i>
          <p>업무목록 내보내기</p>
        </button>
      </div>
    </section>
    <section :class="paging.section" aria-label="페이징 영역">
      <Pagination />
    </section>
  </article>
</template>

<style lang="scss" module="article">
.layout {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  min-height: 742px;
  border-radius: 3px;
  background-color: #ffffff;
  margin: 20px 0;
  padding: 28px 40px;
  box-shadow: 0px 1px 1px rgba(9, 30, 66, 0.25),
    0px 0px 1px rgba(9, 30, 66, 0.31);
}
</style>

<style lang="scss" module="filter">
.section {
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.box {
  position: relative;
  display: flex;
  align-items: center;
}

.search {
  width: 240px;
  height: 32px;
  padding: 6px 30px 6px 8px;
  border: 1px solid $n-50;
  outline: none;

  &::placeholder {
    color: $n-100;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
  }
}

.search_icon {
  position: absolute;
  top: 3px;
  right: 7px;
  color: $m-800;
}

.filter_btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  border: 1px solid $n-50;
  outline: none;
  width: 98px;
  height: 32px;
  border-radius: 4px;
  margin-right: 8px;
  padding: 6px 14px;
  color: $m-700;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;

  i {
    width: 16px;
    height: 16px;
    margin-right: 3px;
  }
}

.align {
  display: flex;

  p {
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

.text {
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  color: $m-400;
  margin-right: 10px;
}
</style>

<style lang="scss" module="grid">
.section {
  width: 100%;
  height: 100%;
}
</style>

<style lang="scss" module="func">
.section {
  width: 100%;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.box {
  position: relative;
  display: flex;
  align-items: center;
}

.btn_on {
  display: flex;
  align-items: center;
  background-color: transparent;
  border: 1px solid $n-50;
  border-radius: 4px;
  outline: none;
  padding: 2px 10px 0 12px;
  color: $m-700;
  margin-right: 8px;
  cursor: pointer;

  p {
    padding: 6px 5px;
    font-weight: 600;
    font-size: 14px;
  }
}

.btn_off {
  display: flex;
  align-items: center;
  background-color: $n-20;
  border: 1px solid $n-20;
  border-radius: 4px;
  outline: none;
  padding: 2px 10px 0 12px;
  color: $n-60;
  margin-right: 8px;

  p {
    padding: 6px 5px;
    font-weight: 600;
    font-size: 14px;
  }
}
</style>

<style lang="scss" module="paging">
.section {
  width: 100%;
  //   background-color: lightcoral;
}
</style>

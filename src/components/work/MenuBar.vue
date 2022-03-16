<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import Button from "@/components/shared/Button.vue";
import Icons from "@/components/shared/Icons.vue";
import Filter from "@/components/work/Filter.vue";
import { useAuthStore, useCommonStore, useWorkStore } from "@/store";

const authStore = useAuthStore();
const commonStore = useCommonStore();
const workStore = useWorkStore();
const isFilter = ref<boolean>(false);

const onFilter = () => {
  isFilter.value = !isFilter.value;
};

const onReload = () => {
  alert("준비중...");
};

const onDelete = () => {
  if (workStore.selected.length > 0) {
    commonStore.setConfirm(
      ["삭제된 데이터는 복구할 수 없습니다.", "정말 삭제하시겠습니까?"],
      "warn",
      () => {
        // TODO: COnfirm Func
      },
      () => {
        // TODO: Cancel Func
      }
    );
  } else {
    commonStore.setToast("삭제 할 수 없습니다.", "warn");
  }
};

const onDownload = () => {
  alert("준비중...");
};

const onUpload = () => {
  alert("준비중...");
};

const mouseenter = (e: MouseEvent) => {
  disabledBubbles();
  const el = e.target as HTMLElement;
  if (!el) {
    return;
  }
  const bubble = el.querySelector(".bubble");
  if (!bubble) {
    return;
  }
  bubble.classList.add("active");
};
const mouseleave = (e: MouseEvent) => {
  disabledBubbles();
};

const disabledBubbles = () => {
  const bubbles = document.querySelectorAll(".bubble");
  if (!bubbles) {
    return;
  }
  bubbles.forEach((el) => {
    el.classList.remove("active");
  });
};

const toProfile = () => {
  alert("준비중...");
};

const onClosest = (e: MouseEvent) => {
  const el = e.target as HTMLElement;
  if (!el) {
    return;
  }

  const closest = el.closest(".filter-wrap");
  if (closest) {
    return;
  }
  isFilter.value = false;
};

onMounted(() => {
  window.addEventListener("click", onClosest);
});

onUnmounted(() => {
  window.removeEventListener("click", onClosest);
});
</script>

<template>
  <div class="menubar-container">
    <div class="work-team">
      <div class="division">
        {{ authStore.user?.division }} ({{ authStore.user?.team?.length || 1 }})
      </div>
      <div class="avatar-wrap">
        <div v-for="(t, idx) in authStore.user?.team" class="avatar">
          <div
            class="img"
            :style="{
              backgroundImage: `url('${t.profile_img}')`,
              transform: `translateX(-${idx * 10}px)`,
              left: `${idx * 48}px`,
            }"
            @mouseenter="mouseenter"
          >
            <div
              class="bubble"
              :class="{ [`bubble-${idx}`]: true }"
              @mouseleave="mouseleave"
            >
              <div class="background">
                <div class="profile">
                  {{
                    `${t.name} ${t.job_position} ${
                      t.id === authStore.user?.id ? "(나)" : ""
                    }`
                  }}
                </div>
                <div class="link" @click="toProfile">프로필 보기</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="work-menu">
      <div class="work-menu__info">
        <!-- <div class="title">업무</div> -->
        <div class="total">전체: {{ "302,234" }}</div>
        <div class="reload" @click="onReload">
          <Icons icons="reload" />
        </div>
        <div class="waiting">대기: {{ "200" }}</div>
        <div class="confirm">완료: {{ "192,049" }}</div>
        <div class="filter-wrap">
          <div class="text" @click="onFilter">검색 필터 선택</div>
          <Filter v-show="isFilter" />
        </div>
      </div>
      <div class="work-menu__btn-wrap">
        <div class="delete">
          <Button class="outline semi-bold color-red" @click="onDelete"
            >삭제</Button
          >
        </div>
        <div class="download">
          <Button class="outline semi-bold" @click="onDownload"
            >다운로드</Button
          >
        </div>
        <div class="upload">
          <Button class="primary semi-bold" @click="onUpload"
            >문서업로드</Button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menubar-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .work-team {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 15px;

    .division {
      color: $d5;
      min-width: 120px;
      font-weight: 600;
      font-size: 24px;
      margin-right: 20px;
    }

    .avatar-wrap {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .avatar {
        height: 100%;
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .img {
          position: absolute;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: $point-blue;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: 100%;
          transition: all 0.2s linear;

          &:hover {
            width: 60px;
            height: 60px;
            z-index: 2;
          }

          .bubble {
            position: absolute;
            top: 10px;
            left: 10%;
            display: none;
            justify-content: flex-end;
            flex-direction: column;
            width: 50px;
            height: 150px;

            &.active {
              display: flex;
            }

            .background {
              position: absolute;
              left: -65%;
              min-width: 115px;
              height: 88px;
              background-color: $d5;
              font-size: 14px;
              font-weight: 600;
              border-radius: 10px;
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;

              &::before {
                position: absolute;
                top: -10px;
                left: 40px;
                transform: rotate(45deg) translate(50%, 0);
                content: "";
                width: 20px;
                height: 20px;
                background-color: $d5;
              }
              .profile {
                color: $d1;
                margin-bottom: 20px;
              }
              .link {
                text-decoration: underline;
                color: $d4;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
  .work-menu {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .work-menu__info {
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      color: $d5;
      font-size: 18px;
      padding-bottom: 10px;

      .title {
        font-size: 24px;
        padding-right: 40px;
      }
      .total {
        padding-right: 20px;
      }
      .reload {
        stroke: $point-blue;
        cursor: pointer;
      }
      .waiting {
        padding: 0 50px;
      }

      .filter-wrap {
        position: relative;

        .text {
          color: $point-blue;
          text-decoration: underline;
          line-height: 20px;
          padding: 0 40px;
          font-weight: 600;
          cursor: pointer;
        }
      }

      .total,
      .title {
        font-weight: 600;
      }
    }

    .work-menu__btn-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .delete,
      .download,
      .upload {
        width: 180px;
        height: 46px;
        margin-left: 20px;
      }
    }
  }
}
</style>

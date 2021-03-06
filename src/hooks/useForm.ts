import { ref, DefineComponent } from "vue";

export type ErrorTypes =
  | "required"
  | "maxLength"
  | "minLength"
  | "pattern"
  | "match"
  | "notMatch";

export type RegisterOptions = {
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: RegExp;
  match?: string;
  notMatch?: string;
};

export type Register = {
  ref: DefineComponent<{}, {}, any>;
  options?: RegisterOptions;
};

export type Values = {
  [k in string]: string;
};

export type Error = {
  type: ErrorTypes | null;
};

export type Errors = {
  [k in string]?: Error;
};

export type FormState = {
  isValid?: boolean;
};

export default function useForm() {
  const formState = ref<FormState>({ isValid: false });
  const registers = ref<Register[]>([]);
  const errors = ref<Errors>({});

  const onValidate = () => {
    let flag = true;
    for (const r of registers.value) {
      const el = r.ref;
      const o = r.options;

      if (o?.required) {
        errors.value[el.name] = {
          type: el.value.length === 0 ? "required" : null,
        };
        if (errors.value[el.name]?.type) {
          flag = false;
          continue;
        }
      }
      if (o?.pattern) {
        errors.value[el.name] = {
          type: !o.pattern.test(el.value) ? "pattern" : null,
        };
        if (errors.value[el.name]?.type) {
          flag = false;
          continue;
        }
      }
      if (!!o?.minLength) {
        errors.value[el.name] = {
          type: el.value.length < o.minLength ? "minLength" : null,
        };
        if (errors.value[el.name]?.type) {
          flag = false;
          continue;
        }
      }
      if (!!o?.maxLength) {
        errors.value[el.name] = {
          type: el.value.length > o.maxLength ? "maxLength" : null,
        };
        if (errors.value[el.name]?.type) {
          flag = false;
          continue;
        }
      }
      if (!!o?.match) {
        const check = registers.value.find(
          (f) => f.ref.name === o.match && f.ref.value !== el.value
        );
        errors.value[el.name] = {
          type: check ? "match" : null,
        };
      }

      if (!!o?.notMatch) {
        const check = registers.value.find(
          (f) => f.ref.name === o.notMatch && f.ref.value === el.value
        );
        errors.value[el.name] = {
          type: check ? "notMatch" : null,
        };
      }
    }

    return flag;
  };

  const addEventListener = (el: HTMLInputElement) => {
    switch (el.type) {
      case "text":
        el.addEventListener("keyup", (e: KeyboardEvent) => {
          formState.value.isValid = onValidate();
        });
        break;
      case "password":
        el.addEventListener("keyup", (e: KeyboardEvent) => {
          formState.value.isValid = onValidate();
        });
        break;
      default:
        break;
    }
  };

  const register = (options?: RegisterOptions) => {
    return (ref: DefineComponent<{}, {}, any> | any) => {
      if (!ref) {
        return;
      }

      if (registers.value.find((r) => r.ref.name === ref.name)) {
        return;
      }

      addEventListener(ref);
      registers.value.push({
        ref,
        options,
      });
    };
  };

  const handleSubmit = (fn: Function) => {
    formState.value.isValid = onValidate();
    if (!formState.value.isValid) {
      return;
    }
    fn();
  };

  const setValidate = () => {
    formState.value.isValid = onValidate();
  };

  const getValues = () => {
    return registers.value.reduce((acc: Values, cur) => {
      acc[cur.ref.name] = cur.ref.value;
      return acc;
    }, {});
  };

  return { handleSubmit, register, getValues, errors, formState, setValidate };
}

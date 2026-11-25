import { requireOptionalNativeModule } from "expo";

interface WidgetModule {
  update(data: string): void;
}

export const Widget = requireOptionalNativeModule<WidgetModule>("Widget");

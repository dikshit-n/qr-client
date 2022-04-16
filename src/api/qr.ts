import { axiosInstance } from "@/utils";

class QrApi {
  validateQr({
    deviceId = "web",
    qrText,
  }: {
    deviceId?: string;
    qrText: string | number;
  }): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        await axiosInstance.get(`/device/${deviceId}/${qrText}`);
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }
}

export const qrApi = new QrApi();

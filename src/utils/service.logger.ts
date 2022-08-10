export class ServiceLogger {
  log(service: string, method: string, args: any[]) {
    console.log(
      `Service: ${service}, method: ${method}, arguments: ${JSON.stringify(
        args,
      )}`,
    );
  }
}

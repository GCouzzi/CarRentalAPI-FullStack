export class AppApiError extends Error{
  constructor(message: string, public status: number) {
        super(message);
    }
}

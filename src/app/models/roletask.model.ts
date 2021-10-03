export class RoleTask {
  constructor(
    public roleId: number,
    public taskId: number,
    public task: string,
    public isSelected = false,
  ) {}
}

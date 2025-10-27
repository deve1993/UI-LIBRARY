# Modal Component

Accessible modal/dialog component with overlay.

## Usage

```tsx
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

const [open, setOpen] = useState(false);

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm Action"
  footer={
    <>
      <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="primary">Confirm</Button>
    </>
  }
>
  Are you sure you want to proceed?
</Modal>
```

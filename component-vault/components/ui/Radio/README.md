# Radio Component

Accessible radio button component with group support.

## Usage

```tsx
import { Radio, RadioGroup } from '@/components/ui/Radio';

<RadioGroup
  name="plan"
  label="Select a plan"
  value={selectedPlan}
  onChange={setSelectedPlan}
>
  <Radio value="free" label="Free" description="$0/month" />
  <Radio value="pro" label="Pro" description="$10/month" />
  <Radio value="enterprise" label="Enterprise" description="$50/month" />
</RadioGroup>
```

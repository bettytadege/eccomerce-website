import { Dialog, DialogContent } from '@radix-ui/react-dialog'
import { Link } from 'react-router-dom';
type CategoryMenuProps = {
    open: boolean;
    onClose: () => void;
  };

function CategoryMenu({open,onClose}:CategoryMenuProps) {
    
  return (
    <>
    
        <Dialog open={open} onOpenChange={onClose} >
     <DialogContent>
        <ul>
            <Link to=''>womens clothing</Link>
            <Link to=''>womens clothing</Link>
            <Link to=''>womens clothing</Link>
        </ul>
     </DialogContent>
        </Dialog>
 
    </>
  )
}

export default CategoryMenu
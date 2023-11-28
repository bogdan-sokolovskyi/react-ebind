import {
	createElement,
	Fragment,
	FunctionComponent,
	ReactNode,
	FunctionComponentElement,
} from "react";

interface CreateEbind {
	<P>(
		ebind: FunctionComponent<P>,
		props?: P,
		...children: ReactNode[]
	): FunctionComponentElement<P>;
}
interface CreateEbinds {
	(...children: ReactNode[]): FunctionComponentElement<{
		children?: ReactNode;
	}>;
}

export type Ebind<P = unknown> = FunctionComponent<P>;

export const ebind: CreateEbind = createElement;

export const ebinds: CreateEbinds = (...children) =>
	createElement(Fragment, null, ...children);
